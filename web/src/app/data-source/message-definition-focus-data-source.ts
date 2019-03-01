import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class MessageDefinitionFocusDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public messageFocus: fhir.MessageDefinitionFocus[]
  ) {
    super();
  }

  private dataStore: {
    messageFocus: fhir.MessageDefinitionFocus[]
  };

  connect(): Observable<fhir.MessageDefinitionFocus[]> {

  //  console.log('messageFocus DataSource connect '+this.patientId);

    const _messageFocus: BehaviorSubject<fhir.MessageDefinitionFocus[]> =
      <BehaviorSubject<fhir.MessageDefinitionFocus[]>>new BehaviorSubject([]);

    this.dataStore = { messageFocus: [] };


    if (this.messageFocus !== []) {
      for (const messageDefinition of this.messageFocus) {
        this.dataStore.messageFocus.push(<fhir.MessageDefinitionFocus> messageDefinition);
      }
      _messageFocus.next(Object.assign({}, this.dataStore).messageFocus);
    }
   return _messageFocus.asObservable();
  }



  disconnect() {}
}
