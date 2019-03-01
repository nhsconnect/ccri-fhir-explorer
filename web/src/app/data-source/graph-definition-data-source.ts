import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class GraphDefinitionDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public graphs: fhir.GraphDefinition[]
  ) {
    super();
  }

  private dataStore: {
    graphs: fhir.GraphDefinition[]
  };

  connect(): Observable<fhir.GraphDefinition[]> {

  //  console.log('graphs DataSource connect '+this.patientId);

    const _graphs: BehaviorSubject<fhir.GraphDefinition[]> =<BehaviorSubject<fhir.GraphDefinition[]>>new BehaviorSubject([]);

    this.dataStore = { graphs: [] };


    if (this.graphs !== []) {
      for (const graph of this.graphs) {
        this.dataStore.graphs.push(<fhir.GraphDefinition> graph);
      }
      _graphs.next(Object.assign({}, this.dataStore).graphs);
    }
   return _graphs.asObservable();
  }



  disconnect() {}
}
