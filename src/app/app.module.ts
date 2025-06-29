import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { RegisterCarComponent } from './pages/register-car/register-car.component';
import { ViewCarsComponent } from './pages/view-cars/view-cars.component';
import { CarDComponent } from './_components/car-d/car-d.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarModalComponent } from './_components/car-modal/car-modal.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { SigninComponent } from './pages/signin/signin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PublicNavbarComponent } from './_components/public-navbar/public-navbar.component';
import { AccountConfigComponent } from './pages/account-config/account-config.component';
import { LoadingComponent } from './_components/loading/loading.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterCarComponent,
    ViewCarsComponent,
    CarDComponent,
    CarModalComponent,
    SigninComponent,
    LandingComponent,
    DashboardComponent,
    PublicNavbarComponent,
    AccountConfigComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    LoadingComponent
],
  providers: [
    { 
      provide: LOCALE_ID, useValue: 'pt'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
