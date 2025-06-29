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


  addCar(car: any) {
    return this.http.post(this.baseUrl, car);
  }


  deleteCar(id: Number) {
    return this.http.delete(this.baseUrl, {params: {id: id.toString()}});   
  }

  getAllCars(){
    const username = localStorage.getItem('username');
    return this.http.get(this.baseUrl, {params: {username: username || ''}});
  }

  getCarById(id: Number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}