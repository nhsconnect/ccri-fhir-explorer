import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';
import {LinksService} from '../../../service/links.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-value-set-detail',
  templateUrl: './value-set-detail.component.html',
  styleUrls: ['./value-set-detail.component.css']
})
export class ValueSetDetailComponent implements OnInit {

  valuesetid = undefined;
  valueSet: fhir.ValueSet;

  constructor(
    public dialog: MatDialog,
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

    const tempid = this.route.snapshot.paramMap.get('valuesetid');
    if (tempid !== undefined && tempid !== this.valuesetid) {
      this.valuesetid = tempid;

      this.fhirService.getResource('/ValueSet/' + this.valuesetid + '/$expand').subscribe(result => {
        this.valueSet = result;
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


  codeSystemClick(uri: string) {
    if (uri.includes('snomed')) return;

    this.fhirService.get('/CodeSystem?url='+uri).
    subscribe(result => {
          if (result.entry !== undefined) {
            console.log('graph id = '+result.entry[0].resource.id);
            this.router.navigateByUrl('/term/codesystem/'+result.entry[0].resource.id , { relativeTo : this.route });
          }
        }
    )
  }
}
