import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class QuestionnaireItemOptionDataSource extends DataSource<any> {

  constructor(public fhirService: FhirService,
              public options: fhir.QuestionnaireItemOption[]
  ) {
    super();
  }

  private dataStore: {
    options: fhir.QuestionnaireItemOption[]
  };

  connect(): Observable<fhir.QuestionnaireItemOption[]> {

  //  console.log('options DataSource connect '+this.patientId);

    const _options: BehaviorSubject<fhir.QuestionnaireItemOption[]> =<BehaviorSubject<fhir.QuestionnaireItemOption[]>>new BehaviorSubject([]);

    this.dataStore = { options: [] };


    if (this.options !== []) {
      for (const option of this.options) {
        this.dataStore.options.push(<fhir.QuestionnaireItemOption> option);
      }
      _options.next(Object.assign({}, this.dataStore).options);
    }
   return _options.asObservable();
  }



  disconnect() {}
}
