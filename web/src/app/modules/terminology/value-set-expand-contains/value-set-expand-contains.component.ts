import {Component, Input, OnInit} from '@angular/core';
import {ConceptMapGroupElementTargetDataSource} from "../../../data-source/concept-map-target-data-source";
import {FhirService} from "../../../service/fhir.service";
import {ValueSetExpansionDataSource} from "../../../data-source/value-set-expansion-data-source";

@Component({
  selector: 'app-value-set-expand-contains',
  templateUrl: './value-set-expand-contains.component.html',
  styleUrls: ['./value-set-expand-contains.component.css']
})
export class ValueSetExpandContainsComponent implements OnInit {

  @Input()
  contains: fhir.ValueSetExpansionContains[];


  dataSource: ValueSetExpansionDataSource;

  displayedColumns = [ 'code', 'display', 'system'];

  constructor(
      private fhirService: FhirService
  ) { }



  ngOnInit() {
    this.dataSource = new ValueSetExpansionDataSource(this.fhirService, this.contains);
  }

}
