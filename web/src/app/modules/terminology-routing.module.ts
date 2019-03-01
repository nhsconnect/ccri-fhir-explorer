import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TerminologyMainComponent} from './terminology/terminology-main/terminology-main.component';
import {ValueSetsComponent} from './terminology/value-sets/value-sets.component';
import {ConceptMapsComponent} from './terminology/concept-maps/concept-maps.component';
import {QuestionnaireComponent} from './terminology/questionnaire-detail/questionnaire.component';
import {ValueSetDetailComponent} from './terminology/value-set-detail/value-set-detail.component';
import {QuestionnaireSummaryComponent} from './terminology/questionnaire/questionnaire-summary.component';
import {CodeSystemComponent} from './terminology/code-system/code-system.component';
import { CodeSystemDetailComponent } from './terminology/code-system-detail/code-system-detail.component';
import {NamingSystemComponent} from './terminology/naming-system/naming-system.component';
import { NamingSystemDetailComponent } from './terminology/naming-system-detail/naming-system-detail.component';
import {ConceptMapDetailComponent} from './terminology/concept-map-detail/concept-map-detail.component';
import {MessageDefinitionComponent} from './terminology/message-definition/message-definition.component';
import {MessageDefinitionDetailComponent} from './terminology/message-definition-detail/message-definition-detail.component';
import {GraphDefinitionComponent} from './terminology/graph-definition/graph-definition.component';
import {GraphDefinitionDetailComponent} from './terminology/graph-definition-detail/graph-definition-detail.component';

const dosRoutes: Routes = [
  {
    path: 'term',  component: TerminologyMainComponent,
    children : [
      { path: '', component: ValueSetsComponent},
      { path: 'namingsystem', component: NamingSystemComponent},
      { path: 'namingsystem/:namingsystemid', component: NamingSystemDetailComponent},
      { path: 'messaging', component: MessageDefinitionComponent},
      { path: 'messaging/:messageid', component: MessageDefinitionDetailComponent},
      { path: 'graph', component: GraphDefinitionComponent},
      { path: 'graph/:graphid', component: GraphDefinitionDetailComponent},
      { path: 'codesystem', component: CodeSystemComponent},
      { path: 'codesystem/:codesystemid', component: CodeSystemDetailComponent},
      { path: 'valuesets', component: ValueSetsComponent},
      { path: 'valuesets/:valuesetid', component: ValueSetDetailComponent},
      { path: 'conceptmaps', component: ConceptMapsComponent},
      { path: 'conceptmaps/:conceptmapid', component: ConceptMapDetailComponent},
      { path: 'questionnaire', component: QuestionnaireSummaryComponent},
      { path: 'questionnaire/:questionnaireid', component: QuestionnaireComponent}
    ]
  }
];

@NgModule({

  imports: [
    RouterModule.forChild(dosRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TerminologyRoutingModule { }
