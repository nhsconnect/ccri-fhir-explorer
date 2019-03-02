import {Component, Input, OnInit} from '@angular/core';

import {FhirService} from "../../../service/fhir.service";
import {ValueSetFilterDataSource} from "../../../data-source/value-set-filter-data-source";

@Component({
  selector: 'app-value-set-include-filter',
  templateUrl: './value-set-include-filter.component.html',
  styleUrls: ['./value-set-include-filter.component.css']
})
export class ValueSetIncludeFilterComponent implements OnInit {

  @Input()
  filters: fhir.ValueSetComposeIncludeFilter[];

  dataSource: ValueSetFilterDataSource;

  displayedColumns = [  'property', 'operation', 'value'];

  constructor(
      private fhirService: FhirService
  ) { }

  ngOnInit() {
    this.dataSource = new ValueSetFilterDataSource(this.fhirService, this.filters);
  }

}
