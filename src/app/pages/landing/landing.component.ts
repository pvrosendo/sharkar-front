import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleStartClick(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/register-cars']);
    } else {
      this.router.navigate(['/signin']);
    }
  }
}
