import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class CapabilityStatementRestResourceSearchParamDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public params: fhir.CapabilityStatementRestResourceSearchParam[]
  ) {
    super();
  }

  private dataStore: {
    params: fhir.CapabilityStatementRestResourceSearchParam[]
  };

  connect(): Observable<fhir.CapabilityStatementRestResourceSearchParam[]> {

  //  console.log('params DataSource connect '+this.patientId);

    const _params: BehaviorSubject<fhir.CapabilityStatementRestResourceSearchParam[]> =<BehaviorSubject<fhir.CapabilityStatementRestResourceSearchParam[]>>new BehaviorSubject([]);

    this.dataStore = { params: [] };


    if (this.params !== []) {
      for (const param of this.params) {
        this.dataStore.params.push(<fhir.CapabilityStatementRestResourceSearchParam> param);
      }
      _params.next(Object.assign({}, this.dataStore).params);
    }
   return _params.asObservable();
  }



  disconnect() {}
}
