import {Component, Input, OnInit} from '@angular/core';
import {FhirService} from "../../../service/fhir.service";
import {QuestionnaireItemOptionDataSource} from "../../../data-source/questionnaire-item-option-data-source";

@Component({
  selector: 'app-questionnaire-item-option',
  templateUrl: './questionnaire-item-option.component.html',
  styleUrls: ['./questionnaire-item-option.component.css']
})
export class QuestionnaireItemOptionComponent implements OnInit {

  @Input()
  options: fhir.QuestionnaireItemOption[];

  dataSource: QuestionnaireItemOptionDataSource;

  displayedColumns = ['code', 'term', 'system'];

  constructor(
      private fhirService: FhirService
  ) { }

  ngOnInit() {
    this.dataSource = new QuestionnaireItemOptionDataSource(this.fhirService, this.options);
  }

}
