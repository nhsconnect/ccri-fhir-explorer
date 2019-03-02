import {Component, Input, OnInit} from '@angular/core';
import {FhirService} from "../../../service/fhir.service";
import {CodeSystemConceptsDataSource} from "../../../data-source/code-system-concepts-data-source";

@Component({
  selector: 'app-code-system-concepts',
  templateUrl: './code-system-concepts.component.html',
  styleUrls: ['./code-system-concepts.component.css']
})
export class CodeSystemConceptsComponent implements OnInit {

  @Input()
  concepts: fhir.CodeSystemConcept[];

  dataSource: CodeSystemConceptsDataSource;

  displayedColumns = [ 'code', 'display'];

  constructor(
      private fhirService: FhirService
  ) { }

  ngOnInit() {
    this.dataSource = new CodeSystemConceptsDataSource(this.fhirService, this.concepts);
  }
}
