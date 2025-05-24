import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface UserInfo {
  username: string;
  email: string;
}

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
    username: '',
    email: ''
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userInfo = {
      username: 'usuario_teste',
      email: 'usuario@teste.com'
    };
  }

  startEditing() {
    this.isEditing = true;
    this.accountForm.patchValue({
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
      console.log('Form submitted:', this.accountForm.value);
      
      this.userInfo = {
        username: this.accountForm.get('username')?.value,
        email: this.accountForm.get('email')?.value
      };
      
      this.isEditing = false;
      this.accountForm.reset();
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  get username() { return this.accountForm.get('username'); }
  get email() { return this.accountForm.get('email'); }
  get currentPassword() { return this.accountForm.get('currentPassword'); }
  get newPassword() { return this.accountForm.get('newPassword'); }
  get confirmPassword() { return this.accountForm.get('confirmPassword'); }
}
