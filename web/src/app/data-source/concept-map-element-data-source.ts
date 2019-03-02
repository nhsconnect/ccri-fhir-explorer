import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class ConceptMapGroupElementDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public graphs: fhir.ConceptMapGroupElement[]
  ) {
    super();
  }

  private dataStore: {
    graphs: fhir.ConceptMapGroupElement[]
  };

  connect(): Observable<fhir.ConceptMapGroupElement[]> {

  //  console.log('graphs DataSource connect '+this.patientId);

    const _graphs: BehaviorSubject<fhir.ConceptMapGroupElement[]> =<BehaviorSubject<fhir.ConceptMapGroupElement[]>>new BehaviorSubject([]);

    this.dataStore = { graphs: [] };


    if (this.graphs !== []) {
      for (const graph of this.graphs) {
        this.dataStore.graphs.push(<fhir.ConceptMapGroupElement> graph);
      }
      _graphs.next(Object.assign({}, this.dataStore).graphs);
    }
   return _graphs.asObservable();
  }



  disconnect() {}
}
