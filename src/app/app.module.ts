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
import { HomeComponent } from './pages/home/home.component';
import { CarDComponent } from './_components/car-d/car-d.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { CarModalComponent } from './_components/car-modal/car-modal.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { UpdateModalComponent } from './_components/update-modal/update-modal.component';
import { SigninComponent } from './pages/signin/signin.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterCarComponent,
    ViewCarsComponent,
    HomeComponent,
    CarDComponent,
    CarModalComponent,
    UpdateModalComponent,
    SigninComponent
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
    MatFormFieldModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
