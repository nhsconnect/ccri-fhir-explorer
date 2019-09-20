import { Component, OnInit } from '@angular/core';
import {FhirService} from "../../../service/fhir.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceDialogComponent} from "../../../dialog/resource-dialog/resource-dialog.component";
import {ObservationDefinitionDataSource} from "../../../data-source/observation-definition-system-data-source";
import {R4} from "@ahryman40k/ts-fhir-types";
import {LinksService} from "../../../service/links.service";

@Component({
  selector: 'app-observation-definition-summary',
  templateUrl: './observation-definition-summary.component.html',
  styleUrls: ['./observation-definition-summary.component.css']
})
export class ObservationDefinitionSummaryComponent implements OnInit {

  observationDefinitions: R4.IObservationDefinition[];

  searchInputName;

  // searchInputPublisher;

  searchInputCode;

  dataSource: ObservationDefinitionDataSource;

  displayedColumns = ['name', 'category', 'datatype', 'valueset', 'units', 'resource'];

  constructor(private fhirService: FhirService,
              private linksService: LinksService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  search(name, code) {
    //console.log(event);
    this.observationDefinitions = [];

    if (name !== undefined) {
      this.searchInputName = name;
    }
    if (code !== undefined) {
      this.searchInputCode = code;
    }

    let url = '/ObservationDefinition';

    if (this.searchInputName !== undefined) {
      url = url + '?name='+ this.searchInputName;
    }
    if (this.searchInputCode !== undefined && this.searchInputCode !== '') {
      if (this.searchInputName === undefined) {
        url = url + '?code='+ this.searchInputCode;
      } else {
        url = url + '&code='+ this.searchInputCode;
      }
    }
    url = url + '&_count=20';



    this.fhirService.getR4(url).subscribe(
        result => {
          const bundle = <fhir.Bundle> result;
          if (bundle.entry !== undefined) {
            for (const entry of bundle.entry) {
              if (entry.resource.resourceType === 'ObservationDefinition') {
                this.observationDefinitions.push(<R4.IObservationDefinition> entry.resource);
              }
            }
          }
          this.dataSource = new ObservationDefinitionDataSource(this.fhirService,  this.observationDefinitions);
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

  selectValueSet(observationDefinition: R4.IObservationDefinition) {
      if (observationDefinition.validCodedValueSet !== undefined && observationDefinition.validCodedValueSet.reference !== null ) {
         this.fhirService.get('/ValueSet?url='+observationDefinition.validCodedValueSet.reference).subscribe(
             bundle => {
               if (bundle !== undefined && bundle.entry.length > 0) {
                 this.router.navigateByUrl('term/valuesets/'+bundle.entry[0].resource.id);
               }
             }
         )
      }
  }
  view(observationDefinition: R4.IObservationDefinition) {
    this.router.navigate([observationDefinition.id], {relativeTo: this.route });
  }

  selectCode(code: any) {
    if (this.linksService.isSNOMED(code.system)) {
      window.open(this.linksService.getSNOMEDLink(code), '_blank');
    }
  }

}
