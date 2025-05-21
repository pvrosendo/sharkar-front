import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../_services/car.service';
import { Car } from '../../_models/car';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  recentCars: Car[] = [];
  priceAlerts: any[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit() {
    this.loadRecentCars();
  }

  loadRecentCars() {
    this.isLoading = true;
    this.carService.getAllCars().subscribe({
      next: (data: any) => {
        
        this.recentCars = data.slice(0, 4);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading recent cars:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register-cars']);
  }

  navigateToViewCars() {
    this.router.navigate(['/view-cars']);
  }
} 