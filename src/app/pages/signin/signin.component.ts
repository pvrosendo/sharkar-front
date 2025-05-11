import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { UserCredentials } from '../../_models/userCredentials';

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
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6)]],
      fullName: [''],
      username: [''],
      usernameOrEmail: ['']
    });
  }

  ngOnInit(): void {
    // TODO: implement token and user check in local storage
  }

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
        this.authService.register(this.signinForm.value).subscribe((res: any) => {
          // TODO: Implement popup message success
          this.signinForm.reset();
        });
      } else {

        var username;
        var email;

        if(this.signinForm.get('usernameOrEmail')?.value.includes('@')){
          email = this.signinForm.get('usernameOrEmail')?.value;
          username = null;
        } else {
          username = this.signinForm.get('usernameOrEmail')?.value;
          email = null;
        }

        var userCredentials: UserCredentials = {
          username: username,
          email: email,
          password: this.signinForm.get('password')?.value
        }

        this.authService.signIn(userCredentials).subscribe((res: any) => {
          this.router.navigate(['/dashboard']);
        });
      }
    }
  }
}
