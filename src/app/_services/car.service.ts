import { Injectable } from '@angular/core';
import { Car } from '../_models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }
  
  cars: Car[] = [
    {
      model: 'fit',
      brand: 'honda',
      year: '2005'
    },
    {
      model: 'uno',
      brand: 'fiat',
      year: '2019'
    },
    {
      model: 'polo',
      brand: 'volkswagen',
      year: '2020'
    }
  ];

  getAllCars(){
    return this.cars;
  }
}
