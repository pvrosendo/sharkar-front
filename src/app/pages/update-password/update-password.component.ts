import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-update-password',
  standalone: false,
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  UpdatePasswordForm: FormGroup;
  hidePassword = true;
  private successToast: any;
  private errorToast: any;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.UpdatePasswordForm = this.fb.group({
      fullName: ['',  Validators.required],
      username: ['',  Validators.required],
      email:    ['',  Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.successToast = new bootstrap.Toast(document.getElementById('successToast') as HTMLElement, {
      delay: 3000,
      autohide: true
    });
    this.errorToast = new bootstrap.Toast(document.getElementById('errorToast') as HTMLElement, {
      delay: 3000,
      autohide: true
    });
  }


  onSubmit(): void {

    if (this.UpdatePasswordForm.valid) {

      this.authService.updateUserPassword(this.UpdatePasswordForm.value).subscribe({
        next: () => {
          this.UpdatePasswordForm.reset();
          this.successToast.show();
          setTimeout(() => {
            window.location.href = '/signin';
          }, 3000);
        },
        error: (error: any) => {
          this.errorToast.show();
          this.errorMessage = error.message;
        }
      });
      
    }
  }
}
