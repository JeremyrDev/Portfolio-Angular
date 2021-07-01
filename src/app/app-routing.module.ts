import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BaselineComponent } from './baseline/baseline.component';
import { SpinComponent } from './spin/spin.component';
import { LeadsComponent } from './leads/leads.component';


const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'contact', component: ContactComponent },
     { path: 'baseline', component: BaselineComponent },
     { path: 'spin', component: SpinComponent },
     { path: 'leads', component: LeadsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
