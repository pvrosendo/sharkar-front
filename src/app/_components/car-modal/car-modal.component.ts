import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Car} from '../../_models/car';
import { CarService } from '../../_services/car.service';
import { ViewCarsComponent } from '../../pages/view-cars/view-cars.component';

@Component({
  selector: 'app-car-modal',
  standalone: false,
  templateUrl: './car-modal.component.html',
  styleUrl: './car-modal.component.css'
})
export class CarModalComponent {
  
  @Input() car: Car | null = null;
  @Output() close = new EventEmitter();
  @Output() carDeleted = new EventEmitter();


  constructor(private carService: CarService, private viewCars: ViewCarsComponent) {}

  DeleteCar(id: Number) {
    if (this.car) {
      this.carService.deleteCar(this.car.id).subscribe(() => {
        this.car = null;
        this.carDeleted.emit();
        this.closeModal();
      });

    } else { this.closeModal(); }
    
  }



  closeModal() {
    this.car = null;
  }
}
