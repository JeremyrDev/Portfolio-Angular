import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './pages/contact/contact.component';
import { BaselineComponent } from './pages/baseline/baseline.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinComponent } from './pages/spin/spin.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { SkillsComponent } from './components/skills/skills.component';
import { WorkComponent } from './components/work/work.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PackagesComponent } from './components/packages/packages.component';
import { RatingComponent } from './components/rating/rating.component';
import { FooterComponent } from './components/footer/footer.component';
import { WorkItemComponent } from './components/work-item/work-item.component';
import { WorkModalComponent } from './components/work-modal/work-modal.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    BaselineComponent,
    SpinComponent,
    LeadsComponent,
    NavbarComponent,
    HeaderComponent,
    SkillsComponent,
    WorkComponent,
    ProjectsComponent,
    PackagesComponent,
    RatingComponent,
    FooterComponent,
    WorkItemComponent,
    WorkModalComponent,
    ContactFormComponent
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
