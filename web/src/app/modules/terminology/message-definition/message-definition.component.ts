import { Component, OnInit } from '@angular/core';
import {FhirService} from '../../../service/fhir.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';
import {MessageDefinitionDataSource} from '../../../data-source/message-definition-data-source';

@Component({
  selector: 'app-message-definition',
  templateUrl: './message-definition.component.html',
  styleUrls: ['./message-definition.component.css']
})
export class MessageDefinitionComponent implements OnInit {

  messageDefinitions: fhir.MessageDefinition[] = [];

  dataSource: MessageDefinitionDataSource;

  searchInputName;

  searchInputUrl;

  displayedColumns = ['view', 'name', 'description', 'status', 'resource'];

  constructor(private fhirService: FhirService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

  search(name, searchUri) {
    if (name !== undefined) {
      this.searchInputName = name;
    }
    if (searchUri !== undefined) {
      this.searchInputUrl = searchUri;
    }

    let url = '/MessageDefinition';

    if (this.searchInputName !== undefined) {
      url = url + '?name=' + this.searchInputName;
    }
    if (this.searchInputUrl !== undefined) {
      if (this.searchInputName === undefined) {
        url = url + '?searchUri=' + this.searchInputUrl;
      } else {
        url = url + '&searchUri=' + this.searchInputUrl;
      }
    }
    url = url + '&_count=20';

    this.messageDefinitions = [];

    this.fhirService.get(url).subscribe(
      result => {
        const bundle = <fhir.Bundle> result;
        if (bundle.entry !== undefined) {
          for (const entry of bundle.entry) {
            if (entry.resource.resourceType === 'MessageDefinition') {
              this.messageDefinitions.push(<fhir.MessageDefinition>entry.resource);
            }
          }
        }
        this.dataSource = new MessageDefinitionDataSource(this.fhirService,  this.messageDefinitions);
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

  view(messageDefinition: fhir.MessageDefinition) {
    this.router.navigate([messageDefinition.id], {relativeTo: this.route });
  }



}
