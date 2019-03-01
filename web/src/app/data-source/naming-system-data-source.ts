import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class NamingSystemDataSource extends DataSource<any> {

  constructor(public fhirService: FhirService,
              public namingSystems: fhir.NamingSystem[]
  ) {
    super();
  }

  private dataStore: {
    namingSystems: fhir.NamingSystem[]
  };

  connect(): Observable<fhir.NamingSystem[]> {

  //  console.log('namingSystems DataSource connect '+this.patientId);

    const _namingSystems: BehaviorSubject<fhir.NamingSystem[]> =<BehaviorSubject<fhir.NamingSystem[]>>new BehaviorSubject([]);

    this.dataStore = { namingSystems: [] };


    if (this.namingSystems !== []) {
      for (const namingSystem of this.namingSystems) {
        this.dataStore.namingSystems.push(<fhir.NamingSystem> namingSystem);
      }
      _namingSystems.next(Object.assign({}, this.dataStore).namingSystems);
    }
   return _namingSystems.asObservable();
  }



  disconnect() {}
}
