import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../_services/car.service';
import { Car } from '../../_models/car';

@Component({
  selector: 'app-update-modal',
  standalone: false,
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css'
})
export class UpdateModalComponent implements OnInit {
  @Input() car: Car = {id: 0, brand: 0, model: '', year: '', price: 0, displacement: '', carType: 0, registerDate: ''};
  @Output() close = new EventEmitter();
  @Output() carUpdated = new EventEmitter();
  
  updateForm: FormGroup;
  
  constructor(
    private carService: CarService,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(10000000)]],
      displacement: [''],
      carType: [''],
      registerDate: ['']
    });
  }

  ngOnInit() {
    this.updateForm.patchValue({
      brand: this.car.brand.toString(),
      model: this.car.model,
      year: this.car.year,
      price: this.car.price,
      displacement: this.car.displacement,
      carType: this.car.carType.toString(),
      registerDate: this.car.registerDate
    });
  }

  closeModal() {
    this.close.emit();
  }

  UpdateCar() {
    if (this.updateForm.valid) {
      const updatedCar = {
        ...this.car,
        brand: parseInt(this.updateForm.value.brand),
        model: this.updateForm.value.model,
        year: this.updateForm.value.year,
        price: this.updateForm.value.price,
        displacement: this.updateForm.value.displacement,
        carType: parseInt(this.updateForm.value.carType),
        registerDate: this.updateForm.value.registerDate
      };
      
      
      this.carService.updateCar(this.car.id, updatedCar).subscribe({
        next: (response) => {
          this.carUpdated.emit();
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao atualizar carro:', error);
        }
      });
    }
  }
}