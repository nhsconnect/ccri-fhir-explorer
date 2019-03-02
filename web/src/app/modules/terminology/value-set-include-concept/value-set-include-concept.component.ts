import {Component, Input, OnInit} from '@angular/core';
import {FhirService} from "../../../service/fhir.service";
import {ValueSetIncludeDataSource} from "../../../data-source/value-set-include-data-source";

@Component({
  selector: 'app-value-set-include-concept',
  templateUrl: './value-set-include-concept.component.html',
  styleUrls: ['./value-set-include-concept.component.css']
})
export class ValueSetIncludeConceptComponent implements OnInit {

  @Input()
  concepts: fhir.ValueSetComposeIncludeConcept[];

  dataSource: ValueSetIncludeDataSource;

  displayedColumns = [ 'code', 'display'];

  constructor(
      private fhirService: FhirService
  ) { }

  ngOnInit() {
    this.dataSource = new ValueSetIncludeDataSource(this.fhirService, this.concepts);
  }

}
