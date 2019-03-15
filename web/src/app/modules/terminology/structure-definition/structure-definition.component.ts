import { Component, OnInit } from '@angular/core';
import {FhirService} from "../../../service/fhir.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceDialogComponent} from "../../../dialog/resource-dialog/resource-dialog.component";
import {StructureDefinitionDataSource} from "../../../data-source/structure-definition-data-source";

@Component({
  selector: 'app-structure-definition',
  templateUrl: './structure-definition.component.html',
  styleUrls: ['./structure-definition.component.css']
})
export class StructureDefinitionComponent implements OnInit {


  structureDefinitions: fhir.StructureDefinition[] = [];

  dataSource: StructureDefinitionDataSource;

  searchInputName;

  searchInputUrl;

  displayedColumns = ['view', 'name', 'publisher', 'description', 'status', 'resource'];

  constructor(private fhirService: FhirService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

  search(name, publisher) {
    //console.log(event);
    this.structureDefinitions = [];

    if (name !== undefined) {
      this.searchInputName = name;
    }
    if (publisher !== undefined) {
      this.searchInputUrl = publisher;
    }

    let url = '/StructureDefinition';

    if (this.searchInputName !== undefined) {
      url = url + '?name='+ this.searchInputName;
    }
    if (this.searchInputUrl !== undefined) {
      if (this.searchInputName === undefined) {
        url = url + '?url=' + this.searchInputUrl;
      } else {
        url = url + '&url=' + this.searchInputUrl;
      }
    }
    url = url + '&_count=20';



    this.fhirService.get(url).subscribe(
        result => {
          const bundle = <fhir.Bundle> result;
          if (bundle.entry !== undefined) {
            for (const entry of bundle.entry) {
              if (entry.resource.resourceType === 'StructureDefinition') {
                this.structureDefinitions.push(<fhir.StructureDefinition>entry.resource);
              }
            }
          }
          this.dataSource = new StructureDefinitionDataSource(this.fhirService,  this.structureDefinitions);
        }
    );
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

  view(structureDefinition: fhir.StructureDefinition) {
    this.router.navigate([structureDefinition.id], {relativeTo: this.route });
  }

}
