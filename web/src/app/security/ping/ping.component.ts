import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {FhirService} from '../../service/fhir.service';
import {Router} from "@angular/router";
import {AppConfigService} from "../../service/app-config.service";





@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {


  constructor(private authService: AuthService,
              private router: Router,
              private  fhirService: FhirService,
              private appConfig: AppConfigService
    ) {
  }


  ngOnInit() {
    if (this.appConfig.getConfig() !== undefined) {
      this.fhirService.get('/Patient/1').subscribe(data => {
        this.router.navigate(['edms']);
      });
    } else {
      this.appConfig.getInitEventEmitter().subscribe(() => {
          this.fhirService.get('/Patient/1').subscribe(data => {
            this.router.navigate(['edms']);
          });
        }
      );

    }
  }






}
