import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInfo } from '../../_models/userInfo';

@Component({
  selector: 'app-account-config',
  standalone: false,
  templateUrl: './account-config.component.html',
  styleUrl: './account-config.component.css'
})
export class AccountConfigComponent implements OnInit {
  accountForm: FormGroup;
  isEditing = false;
  userInfo: UserInfo = {
    fullName: '',
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.accountForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    },
  );
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.authService.getUserInfo(localStorage.getItem('username') || '').subscribe({
      next: (response) => {
        this.userInfo = {
          fullName: response.fullName,
          username: response.username,
          email: response.email,
          password: response.password
        };
      }
      , error: (error) => {
        console.error('Error loading user info', error);
      }
    });
  }

  startEditing() {
    this.isEditing = true;
    this.accountForm.patchValue({
      fullName: this.userInfo.fullName,
      username: this.userInfo.username,
      email: this.userInfo.email
    });
  }

  cancelEditing() {
    this.isEditing = false;
    this.accountForm.reset();
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.userInfo = {
        fullName: this.accountForm.get('fullName')?.value     || this.userInfo.fullName,
        username: this.accountForm.get('username')?.value     || this.userInfo.username,
        email: this.accountForm.get('email')?.value           || this.userInfo.email,
        password: this.accountForm.get('newPassword')?.value  || this.userInfo.password
      };

      this.authService.updateUserInfo(this.userInfo).subscribe({
        next: (response) => {
          console.log('User info updated successfully', response);
          this.isEditing = false;
          this.accountForm.reset();
          this.navigateToDashboard();
        },
        error: (error) => {
          console.error('Error updating user info', error);
        }
      });
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  get fullName() { return this.accountForm.get('fullName'); }
  get username() { return this.accountForm.get('username'); }
  get email() { return this.accountForm.get('email'); }
  get newPassword() { return this.accountForm.get('newPassword'); }
  get confirmPassword() { return this.accountForm.get('confirmPassword'); }
}
