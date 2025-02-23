import { Component } from '@angular/core';
import { CarService } from '../../_services/car.service';
import { Car } from '../../_models/car';


@Component({
  selector: 'app-view-cars',
  standalone: false,
  templateUrl: './view-cars.component.html',
  styleUrl: './view-cars.component.css'
})
export class ViewCarsComponent {

  listCars: Car[] | undefined;

  constructor(private carService: CarService){
    this.listCars = carService.getAllCars();
  }

}
