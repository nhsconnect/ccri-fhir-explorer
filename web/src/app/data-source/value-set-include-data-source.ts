import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class ValueSetIncludeDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public valueSetInlcludes: fhir.ValueSetComposeIncludeConcept[]
  ) {
    super();
  }

  private dataStore: {
    valueSetIncludes: fhir.ValueSetComposeIncludeConcept[]
  };

  connect(): Observable<fhir.ValueSetComposeInclude[]> {

  //  console.log('valueSets DataSource connect '+this.patientId);
   const _valueSetInlcludes: BehaviorSubject<fhir.ValueSetComposeIncludeConcept[]>
     = <BehaviorSubject<fhir.ValueSetComposeIncludeConcept[]>>new BehaviorSubject([]);

    this.dataStore = { valueSetIncludes: [] };


    if (this.valueSetInlcludes !== []) {
      for (const valueSet of this.valueSetInlcludes) {
        this.dataStore.valueSetIncludes.push(<fhir.ValueSetComposeIncludeConcept> valueSet);
      }
      _valueSetInlcludes.next(Object.assign({}, this.dataStore).valueSetIncludes);
    }
   return _valueSetInlcludes.asObservable();
  }



  disconnect() {}
}
