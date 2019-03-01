import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class CodeSystemDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public codeSystems: fhir.CodeSystem[]
  ) {
    super();
  }

  private dataStore: {
    codeSystems: fhir.CodeSystem[]
  };

  connect(): Observable<fhir.CodeSystem[]> {

  //  console.log('codeSystems DataSource connect '+this.patientId);

    const _codeSystems: BehaviorSubject<fhir.CodeSystem[]> =<BehaviorSubject<fhir.CodeSystem[]>>new BehaviorSubject([]);

    this.dataStore = { codeSystems: [] };


    if (this.codeSystems !== []) {
      for (const codeSystem of this.codeSystems) {
        this.dataStore.codeSystems.push(<fhir.CodeSystem> codeSystem);
      }
      _codeSystems.next(Object.assign({}, this.dataStore).codeSystems);
    }
   return _codeSystems.asObservable();
  }



  disconnect() {}
}
