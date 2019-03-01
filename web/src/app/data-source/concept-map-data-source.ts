import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class ConceptMapDataSource extends DataSource<any> {

  constructor(public fhirService: FhirService,
              public conceptMaps: fhir.ConceptMap[]
  ) {
    super();
  }

  private dataStore: {
    conceptMaps: fhir.ConceptMap[]
  };

  connect(): Observable<fhir.ConceptMap[]> {

  //  console.log('conceptMaps DataSource connect '+this.patientId);

    const _conceptMaps: BehaviorSubject<fhir.ConceptMap[]> =<BehaviorSubject<fhir.ConceptMap[]>>new BehaviorSubject([]);

    this.dataStore = { conceptMaps: [] };


    if (this.conceptMaps !== []) {
      for (const conceptMap of this.conceptMaps) {
        this.dataStore.conceptMaps.push(<fhir.ConceptMap> conceptMap);
      }
      _conceptMaps.next(Object.assign({}, this.dataStore).conceptMaps);
    }
   return _conceptMaps.asObservable();
  }



  disconnect() {}
}
