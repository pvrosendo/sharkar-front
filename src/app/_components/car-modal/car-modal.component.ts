import {Component, Input} from '@angular/core';
import {Car} from '../../_models/car';


@Component({
  selector: 'app-car-modal',
  standalone: false,
  templateUrl: './car-modal.component.html',
  styleUrl: './car-modal.component.css'
})
export class CarModalComponent {
  @Input() car: Car | null = null;

  closeModal() {
    this.car = null;
  }
}
