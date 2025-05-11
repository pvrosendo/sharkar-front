import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  recentCars: any[] = [];
  priceAlerts: any[] = [];
  isLoading = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
  }

  navigateToRegister() {
    this.router.navigate(['/register-cars']);
  }

  navigateToViewCars() {
    this.router.navigate(['/view-cars']);
  }
} 