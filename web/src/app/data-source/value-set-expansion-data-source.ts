import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class ValueSetExpansionDataSource extends DataSource<any> {
  
    
    constructor(public fhirService: FhirService,
              public contains: fhir.ValueSetExpansionContains[]
  ) {
    super();
  }

  private dataStore: {
    valueSetIncludes: fhir.ValueSetExpansionContains[]
  };

  connect(): Observable<fhir.ValueSetComposeInclude[]> {

  //  console.log('valueSets DataSource connect '+this.patientId);
   const _contains: BehaviorSubject<fhir.ValueSetExpansionContains[]>
     = <BehaviorSubject<fhir.ValueSetExpansionContains[]>>new BehaviorSubject([]);

    this.dataStore = { valueSetIncludes: [] };


    if (this.contains !== []) {
      for (const valueSet of this.contains) {
        this.dataStore.valueSetIncludes.push(<fhir.ValueSetExpansionContains> valueSet);
      }
      _contains.next(Object.assign({}, this.dataStore).valueSetIncludes);
    }
   return _contains.asObservable();
  }



  disconnect() {}
}
