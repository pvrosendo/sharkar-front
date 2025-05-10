import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
