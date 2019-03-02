import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class CodeSystemConceptsDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public concepts: fhir.CodeSystemConcept[]
  ) {
    super();
  }

  private dataStore: {
    concepts: fhir.CodeSystemConcept[]
  };

  connect(): Observable<fhir.CodeSystemConcept[]> {

  //  console.log('conceptss DataSource connect '+this.patientId);

    const _concepts: BehaviorSubject<fhir.CodeSystemConcept[]> =<BehaviorSubject<fhir.CodeSystemConcept[]>>new BehaviorSubject([]);

    this.dataStore = { concepts: [] };


    if (this.concepts !== []) {
      for (const concepts of this.concepts) {
        this.dataStore.concepts.push(<fhir.CodeSystemConcept> concepts);
      }
      _concepts.next(Object.assign({}, this.dataStore).concepts);
    }
   return _concepts.asObservable();
  }



  disconnect() {}
}
