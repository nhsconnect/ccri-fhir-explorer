import {DataSource} from "@angular/cdk/table";
import {FhirService} from "../service/fhir.service";
import {BehaviorSubject, Observable} from "rxjs";

export class OperationOutcomeIssueDataSource extends DataSource<any> {
    

  private dataStore: {
    outcomes: fhir.OperationOutcomeIssue[]
  };

  public sort;

  constructor(public fhirService : FhirService, public patientId : string, public outcomes: fhir.OperationOutcomeIssue[]
  ) {
    super();

  }


  connect(): Observable<fhir.OperationOutcomeIssue[]> {

    console.log('Obs DataSource connect '+this.patientId);
    let _obs : BehaviorSubject<fhir.OperationOutcomeIssue[]> =<BehaviorSubject<fhir.OperationOutcomeIssue[]>>new BehaviorSubject([]);

    this.dataStore = { outcomes: [] };

     if (this.patientId != undefined) {
      this.fhirService.get('/OperationOutcomeIssue?patient='+this.patientId).subscribe((bundle => {
        if (bundle != undefined && bundle.entry != undefined) {
          for (let entry of bundle.entry) {
            this.dataStore.outcomes.push(<fhir.OperationOutcomeIssue> entry.resource);

          }
        }
        _obs.next(Object.assign({}, this.dataStore).outcomes);
      }));
    } else if (this.outcomes != [] && this.outcomes != undefined) {
       console.log('OperationOutcomeIssue not null');
       for (let outcome of this.outcomes) {
         this.dataStore.outcomes.push( outcome);
       }
       _obs.next(Object.assign({}, this.dataStore).outcomes);
     }
   return _obs.asObservable();
  }

  disconnect() {}
}
