import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConceptMapGroupElementTargetDataSource} from "../../../data-source/concept-map-target-data-source";
import {FhirService} from "../../../service/fhir.service";
import {CapabilityStatementRestResourceSearchParamDataSource} from "../../../data-source/capability-statement-rest-param-data-source";

@Component({
  selector: 'app-capability-statement-search-param-option',
  templateUrl: './capability-statement-search-param-option.component.html',
  styleUrls: ['./capability-statement-search-param-option.component.css']
})
export class CapabilityStatementSearchParamOptionComponent implements OnInit {

  @Input()
  params: fhir.CapabilityStatementRestResourceSearchParam[];

  @Output()
  addOption = new EventEmitter();

  dataSource: CapabilityStatementRestResourceSearchParamDataSource;

  displayedColumns = ['name', 'detail', 'type', 'add'];

  constructor(
      private fhirService: FhirService
  ) { }



  ngOnInit() {
    this.dataSource = new CapabilityStatementRestResourceSearchParamDataSource(this.fhirService,  this.params);
  }


  onAdd(event) {
    this.addOption.emit(event);
  }


}
