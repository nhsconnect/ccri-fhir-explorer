import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class ValueSetFilterDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public valueSetInlcludes: fhir.ValueSetComposeIncludeFilter[]
  ) {
    super();
  }

  private dataStore: {
    valueSetFilters: fhir.ValueSetComposeIncludeFilter[]
  };

  connect(): Observable<fhir.ValueSetComposeIncludeFilter[]> {

  //  console.log('valueSets DataSource connect '+this.patientId);
   const _valueSetInlcludes: BehaviorSubject<fhir.ValueSetComposeIncludeFilter[]>
     = <BehaviorSubject<fhir.ValueSetComposeIncludeFilter[]>>new BehaviorSubject([]);

    this.dataStore = { valueSetFilters: [] };


    if (this.valueSetInlcludes !== []) {
      for (const valueSet of this.valueSetInlcludes) {
        this.dataStore.valueSetFilters.push(<fhir.ValueSetComposeIncludeFilter> valueSet);
      }
      _valueSetInlcludes.next(Object.assign({}, this.dataStore).valueSetFilters);
    }
   return _valueSetInlcludes.asObservable();
  }



  disconnect() {}
}
