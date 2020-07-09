import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { HttpClientModule } from '@angular/common/http';
import {AuthGuard} from './_helpers';
import { MainDashComponent } from './main-dash/main-dash.component';


const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"", component:MainDashComponent,canActivate:[AuthGuard]},
   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    HttpClientModule]
})
export class AppRoutingModule { }
