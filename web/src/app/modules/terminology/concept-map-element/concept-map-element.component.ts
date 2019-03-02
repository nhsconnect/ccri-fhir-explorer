import {Component, Input, OnInit} from '@angular/core';
import {ConceptMapGroupElementDataSource} from "../../../data-source/concept-map-element-data-source";
import {FhirService} from "../../../service/fhir.service";

@Component({
  selector: 'app-concept-map-element',
  templateUrl: './concept-map-element.component.html',
  styleUrls: ['./concept-map-element.component.css']
})
export class ConceptMapElementComponent implements OnInit {


  @Input()
  elements: fhir.ConceptMapGroupElement[];

  dataSource: ConceptMapGroupElementDataSource;

  displayedColumns = ['code', 'display', 'target'];

  constructor(
      private fhirService: FhirService
  ) { }


  ngOnInit() {
    this.dataSource = new ConceptMapGroupElementDataSource(this.fhirService,  this.elements);
  }

}
