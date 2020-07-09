import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { GoogleChartsModule } from 'angular-google-charts'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card"
import {MatIconModule} from "@angular/material/icon"


import {JwtInterceptor} from './_services';
import {ErrorInterceptor} from './_services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MainDashComponent } from './main-dash/main-dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainDashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GoogleChartsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
