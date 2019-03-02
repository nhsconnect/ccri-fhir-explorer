import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';
import {ActivatedRoute, Router} from "@angular/router";
import {FhirService} from "../../../service/fhir.service";

@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.css']
})
export class QuestionnaireItemComponent implements OnInit {

  @Input()
  item: any;

  @Input()
  depth;

  disabled = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private fhirService: FhirService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getIcon(item) {
    switch (item.type) {
      case 'group':
        return 'group';
      case 'reference':
        return 'book';
      case 'choice':
        return 'question_answer';
      case 'string':
        return 'input';
      case 'dateTime': return 'event';
    }
    return 'group';
  }
  getStyle(item) {
    return this._sanitizer.bypassSecurityTrustStyle('{background-color: accent;}');
  }
  getProfile(extension: fhir.Extension[]): string {
     for ( const ext of extension) {
       if (ext.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-allowedProfile') {
         return ext.valueReference.reference;
       }
     }
     return '';
  }

  remove(str: String) {
    if (str === undefined) {
      return '';
    }

    return str.replace('http://hl7.org/fhir/StructureDefinition/questionnaire-', '');
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

  valueSetClick(uri) {
    this.fhirService.get('/ValueSet?url='+uri).
    subscribe(result => {
          if (result.entry !== undefined) {

            this.router.navigateByUrl('/term/valuesets/'+result.entry[0].resource.id , { relativeTo : this.route });
          }
        }
    )
  }

}
