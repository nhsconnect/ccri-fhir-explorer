import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';
import {MessageDefinitionFocusDataSource} from '../../../data-source/message-definition-focus-data-source';
import {MessageDefinitionAllowedResponseDataSource} from '../../../data-source/message-definition-allowed-response-data-source';


@Component({
  selector: 'app-message-definition-detail',
  templateUrl: './message-definition-detail.component.html',
  styleUrls: ['./message-definition-detail.component.css']
})
export class MessageDefinitionDetailComponent implements OnInit {

  messageid = undefined;
  messageDefinition: fhir.MessageDefinition;

  dataSource: MessageDefinitionFocusDataSource;

  dataSourceResponse: MessageDefinitionAllowedResponseDataSource;

  displayedColumns = [ 'resource', 'profile', 'min', 'max'];

  displayedColumnsResponse = [ 'message', 'profile', 'situation'];

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
    this.messageid = this.route.snapshot.paramMap.get('messageid');
    if (this.messageid !== undefined) {
      this.fhirService.getResource('/MessageDefinition/' + this.messageid ).subscribe( result => {
        const message: fhir.MessageDefinition = result;
        this.messageDefinition = message;
        this.dataSource = new MessageDefinitionFocusDataSource(this.fhirService, message.focus);
        this.dataSourceResponse = new MessageDefinitionAllowedResponseDataSource(this.fhirService, message.allowedResponse);
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

  getProfile(focus: fhir.MessageDefinitionFocus) {
    if (focus.profile !==  undefined) {
      return focus.profile.reference;
    }
    return undefined;
  }
  getMessage(response: fhir.MessageDefinitionAllowedResponse) {
    if (response.message !== undefined) {
      return response.message.reference;
    }
    return undefined;
  }
  viewMessage(response: fhir.MessageDefinitionAllowedResponse) {
  }
  graphClick(uri) {
    this.fhirService.get('/GraphDefinition?url='+uri).
    subscribe(result => {
        if (result.entry !== undefined) {
          console.log('graph id = '+result.entry[0].resource.id);
          this.router.navigateByUrl('/term/graph/'+result.entry[0].resource.id , { relativeTo : this.route });
        }
      }
    )
  }
  getMarkdown(markdown: string): string {
    //console.log(markdown);
    if (markdown === undefined) return undefined;
    markdown = markdown.replace(new RegExp('\\\\n','g'),'\n');
    //console.log(markdown);
    return markdown ;
  }
}
