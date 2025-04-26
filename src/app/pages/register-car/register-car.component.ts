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

  carForm: any = new FormGroup({});

  constructor(private fb: FormBuilder, private carService: CarService) { }

  ngOnInit(): void {
    this.loadBrands();
    this.initializeForm();
  }

  initializeForm(): void {
    this.carForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      year: [0, [Validators.required, Validators.min(1800), Validators.max(2030)]],
      price: [0, [Validators.required, Validators.min(0), Validators.max(1000000000)]],
      displacement: ["", [Validators.required]],
      carType: ["", [Validators.required]]
    })
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
    if(this.carForm.valid){
      this.carService.addCar(this.carForm.value).subscribe();
      this.carForm.reset();
    }
  }
}
