import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserCredentials } from '../../_models/userCredentials';
import * as bootstrap from 'bootstrap';

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
  showPrivacyError = false;
  private privacyModal: any;
  private successToast: any;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      fullName: [''],
      username: [''],
      email: [''],
      usernameOrEmail: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      privacyAgreement: [false]
    });
  }

  ngOnInit(): void {
    this.privacyModal = new bootstrap.Modal(document.getElementById('privacyModal') as HTMLElement);
    this.successToast = new bootstrap.Toast(document.getElementById('successToast') as HTMLElement, {
      delay: 3000,
      autohide: true
    });
  }

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
    this.signinForm.reset();
    this.showPrivacyError = false;

    if (this.isSignUp) {
      this.signinForm.get('fullName')?.setValidators([Validators.required]);
      this.signinForm.get('username')?.setValidators([Validators.required]);
      this.signinForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.signinForm.get('usernameOrEmail')?.clearValidators();
      this.signinForm.get('privacyAgreement')?.setValidators([Validators.requiredTrue]);
    } else {
      this.signinForm.get('fullName')?.clearValidators();
      this.signinForm.get('username')?.clearValidators();
      this.signinForm.get('email')?.clearValidators();
      this.signinForm.get('usernameOrEmail')?.setValidators([Validators.required]);
      this.signinForm.get('privacyAgreement')?.clearValidators();
    }

    this.signinForm.get('fullName')?.updateValueAndValidity();
    this.signinForm.get('username')?.updateValueAndValidity();
    this.signinForm.get('email')?.updateValueAndValidity();
    this.signinForm.get('usernameOrEmail')?.updateValueAndValidity();
    this.signinForm.get('privacyAgreement')?.updateValueAndValidity();
  }

  openPrivacyModal(event: Event) {
    event.preventDefault();
    this.privacyModal.show();
  }

  agreeToPrivacy() {
    this.signinForm.patchValue({ privacyAgreement: true });
    this.showPrivacyError = false;
    this.privacyModal.hide();
  }

  onSubmit(): void {
    if (this.isSignUp && !this.signinForm.get('privacyAgreement')?.value) {
      this.showPrivacyError = true;
      return;
    }

    if (this.signinForm.valid) {
      if (this.isSignUp) {
        this.authService.register(this.signinForm.value).subscribe({
          next: () => {
            this.successToast.show();
            setTimeout(() => {
              window.location.href = '/signin';
            }, 3000);
          },
          error: (error) => {
            console.error('Erro ao criar conta:', error);
          }
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

        this.authService.login(userCredentials).subscribe(() => { 
          this.router.navigate(['/dashboard']);
        });
      }
    }
  }
}
