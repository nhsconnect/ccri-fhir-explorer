import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { R4 } from  '@Ahryman40k/ts-fhir-types';

export class ObservationDefinitionDataSource extends DataSource<any> {

  constructor(public fhirService: FhirService,
              public observationDefinitions: R4.IObservationDefinition[]
  ) {
    super();
  }

  private dataStore: {
    observationDefinitions: R4.IObservationDefinition[]
  };

  connect(): Observable<R4.IObservationDefinition[]> {

  //  console.log('observationDefinitions DataSource connect '+this.patientId);

    const _observationDefinitions: BehaviorSubject<R4.IObservationDefinition[]> =<BehaviorSubject<R4.IObservationDefinition[]>>new BehaviorSubject([]);

    this.dataStore = { observationDefinitions: [] };


    if (this.observationDefinitions !== []) {
      for (const observationDefinition of this.observationDefinitions) {
        this.dataStore.observationDefinitions.push(<R4.IObservationDefinition> observationDefinition);
      }
      _observationDefinitions.next(Object.assign({}, this.dataStore).observationDefinitions);
    }
   return _observationDefinitions.asObservable();
  }



  disconnect() {}
}
