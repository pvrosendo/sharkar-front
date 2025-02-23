import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../_services/car.service';

@Component({
  selector: 'app-register-car',
  standalone: false,
  templateUrl: './register-car.component.html',
  styleUrl: './register-car.component.css'
})
export class RegisterCarComponent implements OnInit{
  ngOnInit(): void {
    this.initializeForm();
  }

  carForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder, private carService: CarService){}
  
  initializeForm(){
    this.carForm = this.fb.group({
      brand: [0, [Validators.required, Validators.min(0), Validators.max(14)]],
      model: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      price: [0, [Validators.required, Validators.min(0), Validators.max(1000000000)]],
      registerDate: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    })
  }

  SubmitForm(){
    if(this.carForm.valid){
      this.carService.addCar(this.carForm.value).subscribe();
      this.carForm.reset();
    }
  }
    
}
