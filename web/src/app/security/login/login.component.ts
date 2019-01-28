import {FhirService} from '../../service/fhir.service';
import {CookieService} from 'ngx-cookie';
import {AuthService} from '../../service/auth.service';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
      private _cookieService: CookieService,
      private fhirService: FhirService,
      private authService: AuthService
    ) {
  }

  // https://symbiotics.co.za/integrating-keycloak-with-an-angular-4-web-application/


  ngOnInit() {

      let jwt: any;
      jwt = this._cookieService.get('ccri-token');
      if (jwt === undefined) {
          window.location.href = this.authService.getLogonServer() + '/login?afterAuth=' + document.baseURI + 'login';
      } else {

          localStorage.setItem('ccri-jwt', this._cookieService.get('ccri-token'));
          console.log('logged in');

          this.authService.authoriseOAuth2();
      }



  }





}
