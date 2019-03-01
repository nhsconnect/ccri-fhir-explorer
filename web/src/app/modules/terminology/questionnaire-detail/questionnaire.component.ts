import { Component, OnInit } from '@angular/core';
import {FhirService} from '../../../service/fhir.service';
import {AppConfigService} from '../../../service/app-config.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})


export class QuestionnaireComponent implements OnInit {

  questionnaire: fhir.Questionnaire;

  questionnaireid: string;

  constructor(
    public dialog: MatDialog,
    private appConfig: AppConfigService,
    private route: ActivatedRoute,
    private fhirService: FhirService
  ) { }

  ngOnInit() {


    this.questionnaireid = this.route.snapshot.paramMap.get('questionnaireid');

    this.getQuestionnaire();

  }

  getQuestionnaire() {
    this.fhirService.get('/Questionnaire?_id=' + this.questionnaireid).subscribe(
      result => {
        const bundle: fhir.Bundle = result;
        if (bundle.total > 0) {
          for (const entry of bundle.entry) {
            if (entry.resource.resourceType === 'Questionnaire') {
              console.log('Got Questionnaire');
              this.questionnaire = <fhir.Questionnaire> entry.resource;
            }
          }
        }
      }
    );
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
}
