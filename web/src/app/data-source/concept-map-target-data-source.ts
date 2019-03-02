import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class ConceptMapGroupElementTargetDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public graphs: fhir.ConceptMapGroupElementTarget[]
  ) {
    super();
  }

  private dataStore: {
    graphs: fhir.ConceptMapGroupElementTarget[]
  };

  connect(): Observable<fhir.ConceptMapGroupElementTarget[]> {

  //  console.log('graphs DataSource connect '+this.patientId);

    const _graphs: BehaviorSubject<fhir.ConceptMapGroupElementTarget[]> =<BehaviorSubject<fhir.ConceptMapGroupElementTarget[]>>new BehaviorSubject([]);

    this.dataStore = { graphs: [] };


    if (this.graphs !== []) {
      for (const graph of this.graphs) {
        this.dataStore.graphs.push(<fhir.ConceptMapGroupElementTarget> graph);
      }
      _graphs.next(Object.assign({}, this.dataStore).graphs);
    }
   return _graphs.asObservable();
  }



  disconnect() {}
}
