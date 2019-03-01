import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class MessageDefinitionAllowedResponseDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public messageResponse: fhir.MessageDefinitionAllowedResponse[]
  ) {
    super();
  }

  private dataStore: {
    messageResponse: fhir.MessageDefinitionAllowedResponse[]
  };

  connect(): Observable<fhir.MessageDefinitionAllowedResponse[]> {

  //  console.log('messageResponse DataSource connect '+this.patientId);

    const _messageResponse: BehaviorSubject<fhir.MessageDefinitionAllowedResponse[]> =
      <BehaviorSubject<fhir.MessageDefinitionAllowedResponse[]>>new BehaviorSubject([]);

    this.dataStore = { messageResponse: [] };


    if (this.messageResponse !== []) {
      for (const messageDefinition of this.messageResponse) {
        this.dataStore.messageResponse.push(<fhir.MessageDefinitionAllowedResponse> messageDefinition);
      }
      _messageResponse.next(Object.assign({}, this.dataStore).messageResponse);
    }
   return _messageResponse.asObservable();
  }



  disconnect() {}
}
