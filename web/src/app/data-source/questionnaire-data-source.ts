import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class QuestionnaireDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public questionnaires: fhir.Questionnaire[]
  ) {
    super();
  }

  private dataStore: {
    questionnaires: fhir.Questionnaire[]
  };

  connect(): Observable<fhir.Questionnaire[]> {

  //  console.log('questionnaires DataSource connect '+this.patientId);

    const _questionnaires: BehaviorSubject<fhir.Questionnaire[]> =<BehaviorSubject<fhir.Questionnaire[]>>new BehaviorSubject([]);

    this.dataStore = { questionnaires: [] };


    if (this.questionnaires !== []) {
      for (const questionnaire of this.questionnaires) {
        this.dataStore.questionnaires.push(<fhir.Questionnaire> questionnaire);
      }
      _questionnaires.next(Object.assign({}, this.dataStore).questionnaires);
    }
   return _questionnaires.asObservable();
  }



  disconnect() {}
}
