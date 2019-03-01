import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class GraphDefinitionLinkDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public graphs: fhir.GraphDefinitionLink[]
  ) {
    super();
  }

  private dataStore: {
    graphs: fhir.GraphDefinitionLink[]
  };

  connect(): Observable<fhir.GraphDefinitionLink[]> {

  //  console.log('graphs DataSource connect '+this.patientId);

    const _graphs: BehaviorSubject<fhir.GraphDefinitionLink[]> =<BehaviorSubject<fhir.GraphDefinitionLink[]>>new BehaviorSubject([]);

    this.dataStore = { graphs: [] };


    if (this.graphs !== []) {
      for (const graph of this.graphs) {
        this.dataStore.graphs.push(<fhir.GraphDefinitionLink> graph);
      }
      _graphs.next(Object.assign({}, this.dataStore).graphs);
    }
   return _graphs.asObservable();
  }



  disconnect() {}
}
