import {DataSource} from "@angular/cdk/table";
import {FhirService} from "../service/fhir.service";
import {BehaviorSubject, Observable} from "rxjs";

export class OperationOutcomeDataSource extends DataSource<any> {
    

  private dataStore: {
    outcomes: fhir.OperationOutcome[]
  };


  constructor(public fhirService : FhirService, public patientId : string, public outcomes: fhir.OperationOutcome[]
  ) {
    super();

  }


  connect(): Observable<fhir.OperationOutcome[]> {

    console.log('Obs DataSource connect '+this.patientId);
    let _obs : BehaviorSubject<fhir.OperationOutcome[]> =<BehaviorSubject<fhir.OperationOutcome[]>>new BehaviorSubject([]);

    this.dataStore = { outcomes: [] };

     if (this.patientId != undefined) {
      this.fhirService.get('/OperationOutcome?patient='+this.patientId).subscribe((bundle => {
        if (bundle != undefined && bundle.entry != undefined) {
          for (let entry of bundle.entry) {
            this.dataStore.outcomes.push(<fhir.OperationOutcome> entry.resource);

          }
        }
        _obs.next(Object.assign({}, this.dataStore).outcomes);
      }));
    } else if (this.outcomes != [] && this.outcomes != undefined) {
       console.log('OperationOutcome not null');
       for (let outcome of this.outcomes) {
         this.dataStore.outcomes.push( outcome);
       }
       _obs.next(Object.assign({}, this.dataStore).outcomes);
     }
   return _obs.asObservable();
  }

  disconnect() {}
}
