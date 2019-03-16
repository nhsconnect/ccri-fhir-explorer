import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {FhirService} from "../../../service/fhir.service";
import {ResourceDialogComponent} from "../../../dialog/resource-dialog/resource-dialog.component";

@Component({
  selector: 'app-structure-definition-detail',
  templateUrl: './structure-definition-detail.component.html',
  styleUrls: ['./structure-definition-detail.component.css']
})
export class StructureDefinitionDetailComponent implements OnInit {

  definitionid = undefined;
  structureDefinition: fhir.StructureDefinition;

  public dataSource = new MatTableDataSource<fhir.ElementDefinition>();

  displayedColumns = ['path', 'type','cardinality', 'comment', 'resource'];

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private fhirService: FhirService) { }

  ngOnInit() {

    this.doSetup();

    this.route.url.subscribe( url => {
      this.doSetup();
    });
  }

  doSetup() {
    this.definitionid = this.route.snapshot.paramMap.get('definitionid');
    if (this.definitionid !== undefined) {
      this.fhirService.getResource('/StructureDefinition/' + this.definitionid).subscribe( result => {
        this.structureDefinition = result;
        this.dataSource.data = this.structureDefinition.snapshot.element;
      });
    }
  }

  view(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    this.dialog.open( ResourceDialogComponent, dialogConfig);
  }

  getMarkdown(markdown: string): string {
    //console.log(markdown);
    if (markdown === undefined) return undefined;
    markdown = markdown.replace(new RegExp('\\\\n','g'),'\n');
    //console.log(markdown);
    return markdown ;
  }

  select(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    const resourceDialog: MatDialogRef<ResourceDialogComponent> = this.dialog.open( ResourceDialogComponent, dialogConfig);
  }

}
