import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute, Router} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-concept-map-detail',
  templateUrl: './concept-map-detail.component.html',
  styleUrls: ['./concept-map-detail.component.css']
})
export class ConceptMapDetailComponent implements OnInit {

  // https://material.angular.io/cdk/drag-drop/examples

  valueSet1 = [
    'U - Unmarried',
    'D - Divorced',
    'L - Legally Separated',
    'M - Married',
    'S - Never Married',
    'W - Widowed',
    'UNK - Unknown'
  ];


  valueSet2 = [

    'P - Separated',
    'N - Not disclosed',
    'S - Never Married',
    'W - Widowed',
    'UNK - Unknown'
  ];

  conceptmapid = undefined;
  conceptMap: fhir.ConceptMap;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private fhirService: FhirService) { }

  ngOnInit() {
    this.doSetup();
    this.route.url.subscribe( url => {
      this.doSetup();
    });
  }

  doSetup() {
    this.conceptmapid = this.route.snapshot.paramMap.get('conceptmapid');
    if (this.conceptmapid !== undefined) {
      this.fhirService.getResource('/ConceptMap/' + this.conceptmapid).subscribe( result => {
        this.conceptMap = result;
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
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

  codeSystemClick(uri: string) {
    if (uri.includes('snomed')) return;
    this.fhirService.get('/CodeSystem?url='+uri).
    subscribe(result => {
          if (result.entry !== undefined) {

            this.router.navigateByUrl('/term/codesystem/'+result.entry[0].resource.id , { relativeTo : this.route });
          }
        }
    )
  }

  valueSetClick(uri: string) {
    console.log(uri);
    this.fhirService.get('/ValueSet?url='+uri).
    subscribe(result => {
          if (result.entry !== undefined) {

            this.router.navigateByUrl('/term/valuesets/'+result.entry[0].resource.id , { relativeTo : this.route });
          }
        }
    )
  }
}
