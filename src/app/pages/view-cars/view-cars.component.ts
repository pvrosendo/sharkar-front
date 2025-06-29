import {Component, OnInit} from '@angular/core';
import {CarService} from '../../_services/car.service';
import {Car, FipeInfoModel} from '../../_models/car';


@Component({
  selector: 'app-view-cars',
  standalone: false,
  templateUrl: './view-cars.component.html',
  styleUrl: './view-cars.component.css'
})
export class ViewCarsComponent implements OnInit {

  cars: any[] = [];
  expensiveCar: Car | null = null;

  constructor(private carService: CarService) {}

  ngOnInit() { this.loadCars(); }

  loadCars(){
    this.carService.getAllCars().subscribe((data: any) => {
      this.cars = data;
    });
  }
  refreshCars() { this.loadCars(); }

  openExpensiveCarModal(car: Car) { this.expensiveCar = car; }

  closeModal() { this.expensiveCar = null; }

} 
