import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { AboutComponent } from './pages/about/about.component';
import { ResultsComponent } from './pages/results/results.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'about',component:AboutComponent},
  {path:'results',component:ResultsComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
