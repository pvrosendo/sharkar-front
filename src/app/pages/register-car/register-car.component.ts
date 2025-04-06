import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../_services/car.service';
import { Brand } from '../../_models/brand';

@Component({
  selector: 'app-register-car',
  standalone: false,
  templateUrl: './register-car.component.html',
  styleUrl: './register-car.component.css'
})
export class RegisterCarComponent implements OnInit{
  @Input() brand: Brand = {id: 0, brandId: 0, brandName: ''};
  
  brands: any = [];

  carForm = new FormGroup({
    brand: new FormControl('', Validators.required),
  });
    
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.carService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response;
      },
      error: (error) => {
        console.error('Error loading brands', error);
      }
    })
  }

  SubmitForm(): void {
    if (this.carForm.valid) {
      const selectedBrand = this.carForm.get('brand')?.value;
      console.log('Selected name:', selectedBrand);
    }
  }
}
