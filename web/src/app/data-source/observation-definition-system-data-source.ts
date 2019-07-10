import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class ObservationDefinitionDataSource extends DataSource<any> {

  constructor(public fhirService: FhirService,
              public observationDefinitions: any[]
  ) {
    super();
  }

  private dataStore: {
    observationDefinitions: any[]
  };

  connect(): Observable<any[]> {

  //  console.log('observationDefinitions DataSource connect '+this.patientId);

    const _observationDefinitions: BehaviorSubject<any[]> =<BehaviorSubject<any[]>>new BehaviorSubject([]);

    this.dataStore = { observationDefinitions: [] };


    if (this.observationDefinitions !== []) {
      for (const observationDefinition of this.observationDefinitions) {
        this.dataStore.observationDefinitions.push(<any> observationDefinition);
      }
      _observationDefinitions.next(Object.assign({}, this.dataStore).observationDefinitions);
    }
   return _observationDefinitions.asObservable();
  }



  disconnect() {}
}
