import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';


const routes: Routes = [
  {path:'home',component:PortfolioComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  // {path:'**'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
