import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class NamingSystemUniqueidDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public uniqueids: fhir.NamingSystemUniqueId[]
  ) {
    super();
  }

  private dataStore: {
    uniqueids: fhir.NamingSystemUniqueId[]
  };

  connect(): Observable<fhir.NamingSystemUniqueId[]> {

  //  console.log('uniqueidss DataSource connect '+this.patientId);

    const _uniqueids: BehaviorSubject<fhir.NamingSystemUniqueId[]> =<BehaviorSubject<fhir.NamingSystemUniqueId[]>>new BehaviorSubject([]);

    this.dataStore = { uniqueids: [] };


    if (this.uniqueids !== []) {
      for (const uniqueids of this.uniqueids) {
        this.dataStore.uniqueids.push(<fhir.NamingSystemUniqueId> uniqueids);
      }
      _uniqueids.next(Object.assign({}, this.dataStore).uniqueids);
    }
   return _uniqueids.asObservable();
  }



  disconnect() {}
}
