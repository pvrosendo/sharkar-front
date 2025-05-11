import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCarsComponent } from './pages/view-cars/view-cars.component';
import { RegisterCarComponent } from './pages/register-car/register-car.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'view-cars', component: ViewCarsComponent},
  {path: 'register-cars', component: RegisterCarComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
