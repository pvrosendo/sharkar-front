import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl: string = environment.apiUrl;
 
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllCars(){
    return this.http.get(this.baseUrl);
  }

  getCarById(id: Number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addCar(car: any) {
    return this.http.post(this.baseUrl, car);
  }

  updateCar(id: Number, car: any) {

    return this.http.put(`${this.baseUrl}/${id}`, car);
  }

  deleteCar(id: Number) {
    return this.http.delete(`${this.baseUrl}/${id}`);   
  }
  
}
