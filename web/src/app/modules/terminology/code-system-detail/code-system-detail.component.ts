import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-code-system-detail',
  templateUrl: './code-system-detail.component.html',
  styleUrls: ['./code-system-detail.component.css']
})
export class CodeSystemDetailComponent implements OnInit {

  codesystemid = undefined;
  codeSystem: fhir.CodeSystem;

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
    const tempid = this.route.snapshot.paramMap.get('codesystemid');
    if (tempid!== undefined && this.codesystemid !== tempid ) {
      this.codesystemid = tempid;
      this.fhirService.getResource('/CodeSystem/' + this.codesystemid).subscribe( result => {
        this.codeSystem = result;
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
}
