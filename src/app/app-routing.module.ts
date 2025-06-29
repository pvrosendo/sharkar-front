import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCarsComponent } from './pages/view-cars/view-cars.component';
import { RegisterCarComponent } from './pages/register-car/register-car.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { AccountConfigComponent } from './pages/account-config/account-config.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

export const routes: Routes = [
  {
    path: '', 
    component: LandingComponent,
    pathMatch: 'full'

  },
  {
    path: 'signin', 
    component: SigninComponent
  },
  {
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-cars', 
    component: ViewCarsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-cars', 
    component: RegisterCarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account-config', 
    component: AccountConfigComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-password', 
    component: UpdatePasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
