import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder){}
  
  initializeForm(){
    this.carForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      brand: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    })
  }

  SubmitForm(){
    if(this.carForm.valid){
      this.carForm.reset();
    }
  }
    
}
