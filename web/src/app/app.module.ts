import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import 'hammerjs';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  CovalentChipsModule,
  CovalentDialogsModule, CovalentExpansionPanelModule,
  CovalentJsonFormatterModule,
  CovalentLayoutModule, CovalentLoadingModule,
  CovalentMediaModule, CovalentMenuModule,
  CovalentMessageModule, CovalentNotificationsModule,
  CovalentStepsModule
} from '@covalent/core';
import {CovalentHttpModule} from '@covalent/http';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';
import {AppRoutingModule} from './app-routing.module';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule, MatChipsModule,
    MatDatepickerModule,
    MatDialogModule, MatFormFieldModule, MatGridListModule,

    MatIconModule,
    MatIconRegistry,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule, MatProgressBarModule, MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule, MatTooltipModule,


} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MainComponent} from './modules/explorer/main/main.component';
import { ConformanceComponent } from './modules/explorer/conformance/conformance.component';
import { ResourceComponent } from './modules/explorer/resource/resource.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ErrorsHandler} from './error-handler';
import {MessageService} from './service/message.service';
import {LinksService} from './service/links.service';
import {EprService} from './service/epr.service';
import {ResponseInterceptor} from './service/response-interceptor';
import { ExplorerMainComponent } from './modules/explorer/explorer-main/explorer-main.component';
import {EprRoutingModule} from './modules/epr-routing.module';
import {ImageViewerModule} from '@hallysonh/ngx-imageviewer';
import {NguiMapModule} from '@ngui/map';
import {AuthGuard} from './service/auth-guard';
import {AuthService} from './service/auth.service';
import {Oauth2Service} from './service/oauth2.service';
import {CookieModule, CookieService} from 'ngx-cookie';
import {LoginComponent} from './security/login/login.component';
import {CallbackComponent} from './security/callback/callback.component';
import {PingComponent} from './security/ping/ping.component';
import {LogoutComponent} from './security/logout/logout.component';
import {AuthGuardOauth2} from './service/auth-guard-oauth2';
import {OAuthModule} from 'angular-oauth2-oidc';
//  https://github.com/Teradata/covalent-echarts/issues/50
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { CovalentBarEchartsModule } from '@covalent/echarts/bar';
import { CovalentLineEchartsModule } from '@covalent/echarts/line';
import { CovalentTooltipEchartsModule } from '@covalent/echarts/tooltip';
import {AppConfigService} from './service/app-config.service';
import {LoadingComponent} from './security/loading/loading.component';


const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadConfig();
  };
};


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ConformanceComponent,
    ResourceComponent,
      LoginComponent,
    CallbackComponent,
    PingComponent,
    LoadingComponent,
    LogoutComponent,

    ExplorerMainComponent,


  ],
  entryComponents: [


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
      HttpClientModule,

      FormsModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      MatFormFieldModule,

      CookieModule
          .forRoot(),


    MatMomentDateModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,

    MatToolbarModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSnackBarModule,
      MatBadgeModule,
      MatChipsModule,
      MatProgressBarModule,
      MatRadioModule,
    MatTooltipModule,
    MatGridListModule,
    MatGridListModule,

    CovalentLayoutModule,
    CovalentStepsModule,
    // (optional) Additional Covalent Modules imports
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentMediaModule,
    CovalentMessageModule,
    CovalentJsonFormatterModule,
    CovalentDialogsModule,
    CovalentExpansionPanelModule,
    CovalentChipsModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentBaseEchartsModule,
    CovalentBarEchartsModule,
    CovalentLineEchartsModule,
    CovalentTooltipEchartsModule,
    CovalentLoadingModule,

      ImageViewerModule,
     NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDC8GmtqZiQXc16qf1v870NKy-phjv-1N0'}),
    //  NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key='}),

    EprRoutingModule,
      AppRoutingModule,

    OAuthModule.forRoot()
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    MatIconRegistry,
      MessageService,
    LinksService,
    EprService,
      AuthGuard,
    AuthGuardOauth2,
      AuthService,
      CookieService,
      Oauth2Service,


    { provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {
          provide: ErrorHandler,
          useClass: ErrorsHandler,
      },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
