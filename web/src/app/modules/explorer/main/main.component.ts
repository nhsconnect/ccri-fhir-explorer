import { Component, OnInit } from '@angular/core';
import {FhirService} from "../../../service/fhir.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private FHIRSrv: FhirService,
              private route: ActivatedRoute) { }

  public conformance: fhir.CapabilityStatement;

  public serverBase: string;

  ngOnInit() {
   // console.log('main on init');

    this.FHIRSrv.getConformance();

    this.serverBase = this.FHIRSrv.getFHIRServerBase();

    this.route.url.subscribe( url => {
     // console.log('activated route url ='+url);

        let conformance = this.FHIRSrv.getConformance();
        if (conformance !== undefined) {
          //console.log(conformance);
          this.conformance=conformance;
        }
      });


    this.FHIRSrv.getConformanceChange().subscribe(capabilityStatement =>
    {
      this.conformance = capabilityStatement;
      this.serverBase = this.FHIRSrv.getFHIRServerBase();
    },
        (error)=> {
      console.log('main error'+ error);
        });
  }

}
