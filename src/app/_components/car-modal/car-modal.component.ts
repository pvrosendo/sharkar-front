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

  DeleteCar(id: Number | undefined) {
    if (id && this.car) {
      this.carService.deleteCar(id).subscribe(() => {
        this.carDeleted.emit();
        this.closeModal();
      });
    } else { 
      this.closeModal(); 
    }
  }

  closeModal() {
    this.car = null;
    this.close.emit();
  }

  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } 
}
