import { Component, OnInit } from '@angular/core';
import { CarService } from '../../_services/car.service';


@Component({
  selector: 'app-view-cars',
  standalone: false,
  templateUrl: './view-cars.component.html',
  styleUrl: './view-cars.component.css'
})
export class ViewCarsComponent implements OnInit{

  cars: any[] = [];

  constructor(private carService: CarService){}

  ngOnInit(){
    this.carService.getAllCars().subscribe((data: any) => {
      this.cars = data;
    });
  }
}
