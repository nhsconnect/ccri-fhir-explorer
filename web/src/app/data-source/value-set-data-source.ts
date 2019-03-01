import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class ValueSetDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public valueSets: fhir.ValueSet[]
  ) {
    super();
  }

  private dataStore: {
    valueSets: fhir.ValueSet[]
  };

  connect(): Observable<fhir.ValueSet[]> {

  //  console.log('valueSets DataSource connect '+this.patientId);

    const _valueSets: BehaviorSubject<fhir.ValueSet[]> =<BehaviorSubject<fhir.ValueSet[]>>new BehaviorSubject([]);

    this.dataStore = { valueSets: [] };


    if (this.valueSets !== []) {
      for (const valueSet of this.valueSets) {
        this.dataStore.valueSets.push(<fhir.ValueSet> valueSet);
      }
      _valueSets.next(Object.assign({}, this.dataStore).valueSets);
    }
   return _valueSets.asObservable();
  }



  disconnect() {}
}
