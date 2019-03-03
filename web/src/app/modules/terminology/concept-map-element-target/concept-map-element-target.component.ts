import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FhirService} from "../../../service/fhir.service";
import {ConceptMapGroupElementTargetDataSource} from "../../../data-source/concept-map-target-data-source";

@Component({
  selector: 'app-concept-map-element-target',
  templateUrl: './concept-map-element-target.component.html',
  styleUrls: ['./concept-map-element-target.component.css']
})
export class ConceptMapElementTargetComponent implements OnInit {

  @Input()
  targets: fhir.ConceptMapGroupElementTarget[];



  dataSource: ConceptMapGroupElementTargetDataSource;

  displayedColumns = ['equivalence', 'code', 'display', 'comment'];

  constructor(
      private fhirService: FhirService
  ) { }



  ngOnInit() {
    this.dataSource = new ConceptMapGroupElementTargetDataSource(this.fhirService,  this.targets);
  }


}
