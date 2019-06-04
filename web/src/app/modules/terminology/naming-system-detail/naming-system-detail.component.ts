import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-naming-system-detail',
  templateUrl: './naming-system-detail.component.html',
  styleUrls: ['./naming-system-detail.component.css']
})
export class NamingSystemDetailComponent implements OnInit {

  namingSystemid = undefined;
  namingSystem: fhir.NamingSystem;

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

    const tempid = this.route.snapshot.paramMap.get('namingsystemid');
    if (tempid !== undefined && tempid !== this.namingSystemid) {
      this.namingSystemid = tempid;

      this.fhirService.getResource('/NamingSystem/' + this.namingSystemid).subscribe( result => {
        this.namingSystem = result;
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
