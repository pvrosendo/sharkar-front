import { Component, Input } from '@angular/core';
import { Car } from '../../_models/car';

@Component({
  selector: 'app-car-d',
  standalone: false,
  templateUrl: './car-d.component.html',
  styleUrl: './car-d.component.css'
})
export class CarDComponent {
  @Input() car: Car = {model: '', brand: '', year: ''};
}
