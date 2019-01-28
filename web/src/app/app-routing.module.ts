import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './security/login/login.component';
import {CallbackComponent} from './security/callback/callback.component';
import {LogoutComponent} from './security/logout/logout.component';
import {PingComponent} from './security/ping/ping.component';
import {LoadingComponent} from './security/loading/loading.component';

const routes: Routes = [
  { path: '', component: LoadingComponent },

   {  path: 'error', redirectTo: 'exp'},
   {  path: 'login', component : LoginComponent},
  {  path: 'ping', component : PingComponent},
  {  path: 'logout', component : LogoutComponent}  ,
  {  path: 'callback', component : CallbackComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always'}) ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}


