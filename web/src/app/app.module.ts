import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import 'hammerjs';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  CovalentChipsModule, CovalentDataTableModule,
  CovalentDialogsModule, CovalentExpansionPanelModule, CovalentFileModule,
  CovalentJsonFormatterModule,
  CovalentLayoutModule, CovalentLoadingModule,
  CovalentMediaModule, CovalentMenuModule,
  CovalentMessageModule, CovalentNotificationsModule, CovalentSearchModule,
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
import {AppConfigService} from './service/app-config.service';
import {LoadingComponent} from './security/loading/loading.component';
import {CovalentCodeEditorModule} from "@covalent/code-editor";
import {TerminologyRoutingModule} from "./modules/terminology-routing.module";
import {TerminologyMainComponent} from "./modules/terminology/terminology-main/terminology-main.component";
import {GraphDefinitionLinkComponent} from "./modules/terminology/graph-definition-link/graph-definition-link.component";
import {GraphDefinitionDetailComponent} from "./modules/terminology/graph-definition-detail/graph-definition-detail.component";
import {ValueSetDetailComponent} from "./modules/terminology/value-set-detail/value-set-detail.component";
import {QuestionnaireSummaryComponent} from "./modules/terminology/questionnaire/questionnaire-summary.component";
import {CodeSystemComponent} from "./modules/terminology/code-system/code-system.component";
import {CodeSystemDetailComponent} from "./modules/terminology/code-system-detail/code-system-detail.component";
import {NamingSystemComponent} from "./modules/terminology/naming-system/naming-system.component";
import {NamingSystemDetailComponent} from "./modules/terminology/naming-system-detail/naming-system-detail.component";
import {ConceptMapDetailComponent} from "./modules/terminology/concept-map-detail/concept-map-detail.component";
import {MessageDefinitionComponent} from "./modules/terminology/message-definition/message-definition.component";
import {MessageDefinitionDetailComponent} from "./modules/terminology/message-definition-detail/message-definition-detail.component";
import {GraphDefinitionComponent} from "./modules/terminology/graph-definition/graph-definition.component";
import {ValueSetsComponent} from "./modules/terminology/value-sets/value-sets.component";
import {ConceptMapsComponent} from "./modules/terminology/concept-maps/concept-maps.component";
import {QuestionnaireComponent} from "./modules/terminology/questionnaire-detail/questionnaire.component";
import {QuestionnaireItemComponent} from "./modules/terminology/questionnaire-item/questionnaire-item.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ResourceDialogComponent} from "./dialog/resource-dialog/resource-dialog.component";
import {ConceptMapElementComponent} from "./modules/terminology/concept-map-element/concept-map-element.component";
import { ConceptMapElementTargetComponent } from './modules/terminology/concept-map-element-target/concept-map-element-target.component';
import { ValueSetExpandContainsComponent } from './modules/terminology/value-set-expand-contains/value-set-expand-contains.component';
import { ValueSetIncludeConceptComponent } from './modules/terminology/value-set-include-concept/value-set-include-concept.component';
import { ValueSetIncludeFilterComponent } from './modules/terminology/value-set-include-filter/value-set-include-filter.component';
import { CodeSystemConceptsComponent } from './modules/terminology/code-system-concepts/code-system-concepts.component';
import { NamingSystemUniqueIdComponent } from './modules/terminology/naming-system-unique-id/naming-system-unique-id.component';
import { QuestionnaireItemOptionComponent } from './modules/terminology/questionnaire-item-option/questionnaire-item-option.component';
import { CapabilityStatementSearchParamOptionComponent } from './modules/explorer/capability-statement-search-param-option/capability-statement-search-param-option.component';

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

    ResourceDialogComponent,

    ExplorerMainComponent,

    TerminologyMainComponent,

    ValueSetDetailComponent,
    ValueSetsComponent,

    QuestionnaireSummaryComponent,
    QuestionnaireComponent,
    QuestionnaireItemComponent,

    CodeSystemComponent,
    CodeSystemDetailComponent,

    NamingSystemComponent,
    NamingSystemDetailComponent,

    ConceptMapsComponent,
    ConceptMapDetailComponent,

    MessageDefinitionComponent,
    MessageDefinitionDetailComponent,

    GraphDefinitionComponent,
    GraphDefinitionDetailComponent,
    GraphDefinitionLinkComponent,
    ConceptMapElementComponent,
    ConceptMapElementTargetComponent,
    ValueSetExpandContainsComponent,
    ValueSetIncludeConceptComponent,
    ValueSetIncludeFilterComponent,
    CodeSystemConceptsComponent,
    NamingSystemUniqueIdComponent,
    QuestionnaireItemOptionComponent,
    CapabilityStatementSearchParamOptionComponent


  ],
  entryComponents: [
    ResourceDialogComponent

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

    DragDropModule,

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
    CovalentLoadingModule,
    CovalentDataTableModule,
    CovalentCodeEditorModule,
    CovalentFileModule,
    CovalentSearchModule,

      // Routing

    EprRoutingModule,
      TerminologyRoutingModule,
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
