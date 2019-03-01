import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {FhirService} from '../../../service/fhir.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';
import {ConceptMapDataSource} from '../../../data-source/concept-map-data-source';

@Component({
  selector: 'app-conccept-maps',
  templateUrl: './concept-maps.component.html',
  styleUrls: ['./concept-maps.component.css']
})
export class ConceptMapsComponent implements OnInit {


  conceptMaps: fhir.ConceptMap[];

  searchInputName;

  // searchInputPublisher;

  searchInputUrl;

  dataSource: ConceptMapDataSource;

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

    let url = '/ConceptMap';

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

    this.conceptMaps = [];

    this.fhirService.get(url).subscribe(
      result => {
        const bundle = <fhir.Bundle> result;
        if (bundle.entry !== undefined) {
          for (const entry of bundle.entry) {
            if (entry.resource.resourceType === 'ConceptMap') {
              this.conceptMaps.push(<fhir.ConceptMap>entry.resource);
            }
          }
        }
        this.dataSource = new ConceptMapDataSource(this.fhirService,  this.conceptMaps);
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

  view(conceptMap: fhir.ConceptMap) {
    this.router.navigate([conceptMap.id], {relativeTo: this.route });
  }



}
