import { Component, OnInit } from '@angular/core';
import {ValueSetDataSource} from '../../../data-source/value-set-data-source';
import {FhirService} from '../../../service/fhir.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';
import {CodeSystemDataSource} from '../../../data-source/code-system-data-source';

@Component({
  selector: 'app-code-system',
  templateUrl: './code-system.component.html',
  styleUrls: ['./code-system.component.css']
})
export class CodeSystemComponent implements OnInit {

  codeSystems: fhir.CodeSystem[];

  searchInputName;

 // searchInputPublisher;

  searchInputUrl;

  dataSource: CodeSystemDataSource;

  displayedColumns = ['view', 'name', 'publisher', 'description', 'status', 'resource'];

  constructor(private fhirService: FhirService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  search(name, uri) {
    //console.log(event);
    if (name !== undefined) {
      this.searchInputName = name;
    }
    if (uri !== undefined) {
      this.searchInputUrl = uri;
    }

    let url = '/CodeSystem';

    if (this.searchInputName !== undefined) {
      url = url + '?name='+ this.searchInputName;
    }
    if (this.searchInputUrl !== undefined) {
      if (this.searchInputName === undefined) {
        url = url + '?url='+ this.searchInputUrl;
      } else {
        url = url + '&url='+ this.searchInputUrl;
      }
    }
    url = url + '&_count=20';

    this.codeSystems = [];

    this.fhirService.get(url).subscribe(
      result => {
        const bundle = <fhir.Bundle> result;
        if (bundle.entry !== undefined) {
          for (const entry of bundle.entry) {
            if (entry.resource.resourceType === 'CodeSystem') {
              this.codeSystems.push(<fhir.CodeSystem>entry.resource);
            }
          }
        }
       this.dataSource = new CodeSystemDataSource(this.fhirService,  this.codeSystems);
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

  view(codeSystem: fhir.CodeSystem) {
    this.router.navigate([codeSystem.id], {relativeTo: this.route });
  }

}
