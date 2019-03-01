import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class MessageDefinitionDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public messageDefinitions: fhir.MessageDefinition[]
  ) {
    super();
  }

  private dataStore: {
    messageDefinitions: fhir.MessageDefinition[]
  };

  connect(): Observable<fhir.MessageDefinition[]> {

  //  console.log('messageDefinitions DataSource connect '+this.patientId);

    const _messageDefinitions: BehaviorSubject<fhir.MessageDefinition[]> =
      <BehaviorSubject<fhir.MessageDefinition[]>>new BehaviorSubject([]);

    this.dataStore = { messageDefinitions: [] };


    if (this.messageDefinitions !== []) {
      for (const messageDefinition of this.messageDefinitions) {
        this.dataStore.messageDefinitions.push(<fhir.MessageDefinition> messageDefinition);
      }
      _messageDefinitions.next(Object.assign({}, this.dataStore).messageDefinitions);
    }
   return _messageDefinitions.asObservable();
  }



  disconnect() {}
}
