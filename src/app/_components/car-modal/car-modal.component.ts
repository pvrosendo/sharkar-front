import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Car} from '../../_models/car';
import { CarService } from '../../_services/car.service';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

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
  @Output() carToUpdate = new EventEmitter<{id: Number, car: Car}>();

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

  UpdateCar(id: Number, car: any) {
    this.carToUpdate.emit({id, car});
    this.closeModal();
  }

  closeModal() {
    this.car = null;
    this.close.emit();
  }
}
