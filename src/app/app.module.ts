import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { BaselineComponent } from './baseline/baseline.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinComponent } from './spin/spin.component';
import { LeadsComponent } from './leads/leads.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    BaselineComponent,
    SpinComponent,
    LeadsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
