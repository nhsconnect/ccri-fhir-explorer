import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {IAlertConfig, TdDialogService, TdMediaService} from '@covalent/core';
import {FhirService} from '../../../service/fhir.service';
import {MessageService} from '../../../service/message.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {EprService} from '../../../service/epr.service';
import {AuthService} from '../../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-terminology-main',
  templateUrl: './terminology-main.component.html',
  styleUrls: ['./terminology-main.component.css']
})
export class TerminologyMainComponent implements OnInit {



  routes: Object[] = [
  ];

  oauth2routes: Object[] = [
  ];

  routesExt: Object[] = [
  ];


  usermenu: Object[] = [{
    icon: 'swap_horiz',
    route: '.',
    title: 'Switch account',
  }, {
    icon: 'tune',
    route: '.',
    title: 'Account settings',
  }, {
    icon: 'exit_to_app',
    route: '.',
    title: 'Sign out',
  },
  ];
  navmenu: Object[] = [];

  title = 'Reference Services';

  constructor(public media: TdMediaService,
              public fhirSrv: FhirService,
              private router: Router,
              private messageService: MessageService,
              private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private eprService: EprService,
              public authService: AuthService,
              private route: ActivatedRoute
             ) { }

  ngOnInit() {

    // Work around for local systems
    this.routes = this.eprService.routes;
    this.routesExt = this.eprService.routesExt;
    this.oauth2routes = this.eprService.oauth2routes;


    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/github.svg'));



    this.messageService.getMessageEvent().subscribe(
      error => {
        if (this.router.url.includes('exp')) {
          const alertConfig: IAlertConfig = {
            message: error
          };
          alertConfig.disableClose = false; // defaults to false
          alertConfig.viewContainerRef = this._viewContainerRef;
          alertConfig.title = 'Alert'; // OPTIONAL, hides if not provided

          alertConfig.width = '400px'; // OPTIONAL, defaults to 400px
          this._dialogService.openConfirm(alertConfig).afterClosed().subscribe((accept: boolean) => {

          });
        } else {
          console.log('not my baby');
        }

      }

    );

    this.fhirSrv.getConformance();

  }

  onLogin() {
    this.authService.setBaseUrlOAuth2();
    this.router.navigateByUrl('/login');
  }

  onClickR(route) {
    this.router.navigate([ route ],{relativeTo: this.route });
  }
  onClick(route) {
    this.router.navigateByUrl(route);
  }


}
