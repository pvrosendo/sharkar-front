import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Car} from '../../_models/car';
import { CarService } from '../../_services/car.service';

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

  constructor(private carService: CarService) {}

  DeleteCar(id: Number) {
    if (this.car) {
      this.carService.deleteCar(id).subscribe(() => {
        this.car = null;
        this.carDeleted.emit();
        this.closeModal();
      });

    } else { this.closeModal(); }
  }

  UpdateCar(id: Number){
    if (this.car){
      this.carService.updateCar(id, this.car).subscribe(() => {
        this.close.emit();
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.car = null;
  }
}
