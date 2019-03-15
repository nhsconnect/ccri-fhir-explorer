import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class StructureDefinitionDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public structureDefinitions: fhir.StructureDefinition[]
  ) {
    super();
  }

  private dataStore: {
    structureDefinitions: fhir.StructureDefinition[]
  };

  connect(): Observable<fhir.StructureDefinition[]> {

  //  console.log('structureDefinitions DataSource connect '+this.patientId);

    const _structureDefinitions: BehaviorSubject<fhir.StructureDefinition[]> =<BehaviorSubject<fhir.StructureDefinition[]>>new BehaviorSubject([]);

    this.dataStore = { structureDefinitions: [] };


    if (this.structureDefinitions !== []) {
      for (const structureDefinition of this.structureDefinitions) {
        this.dataStore.structureDefinitions.push(<fhir.StructureDefinition> structureDefinition);
      }
      _structureDefinitions.next(Object.assign({}, this.dataStore).structureDefinitions);
    }
   return _structureDefinitions.asObservable();
  }



  disconnect() {}
}
