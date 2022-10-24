import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'contact', component: ContactComponent },
    //  { path: 'baseline', component: BaselineComponent },
    //  { path: 'spin', component: SpinComponent },
    //  { path: 'leads', component: LeadsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
