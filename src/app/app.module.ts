import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { BaseUiComponent } from './_components/base-ui/base-ui.component';
import { RegisterCarComponent } from './pages/register-car/register-car.component';
import { ViewCarsComponent } from './pages/view-cars/view-cars.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewCarComponent } from './_components/view-car/view-car.component';
import { CarDComponent } from './_components/car-d/car-d.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { CarModalComponent } from './_components/car-modal/car-modal.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BaseUiComponent,
    RegisterCarComponent,
    ViewCarsComponent,
    HomeComponent,
    ViewCarComponent,
    CarDComponent,
    CarModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
