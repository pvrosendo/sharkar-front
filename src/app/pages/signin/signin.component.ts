import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  hidePassword = true;
  isSignUp = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
      username: ['']
    });
  }

  ngOnInit(): void {}

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
    if (this.isSignUp) {
      this.signinForm.get('name')?.setValidators([Validators.required]);
      this.signinForm.get('username')?.setValidators([Validators.required]);
    } else {
      this.signinForm.get('name')?.clearValidators();
      this.signinForm.get('username')?.clearValidators();
    }
    this.signinForm.get('name')?.updateValueAndValidity();
    this.signinForm.get('username')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      if (this.isSignUp) {
        // TODO: Implement signup logic
      } else {
        // TODO: Implement signin logic
      }
    }
  }
}
