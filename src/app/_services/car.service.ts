import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl: string = environment.apiUrl;
  fipeUrl: string = environment.apiUrlFipe;
 
  constructor(private http: HttpClient) { }

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

  getAllBrands(){
    return this.http.get(this.fipeUrl + "/brands");
  }

  getAllModelsByBrand(brandId: Number){
    return this.http.get(this.fipeUrl + "/models?brandId=" + brandId);
  }

  getAllYearsByBrandAndModel(brandId: Number, modelId: Number){
    return this.http.get(this.fipeUrl + "/years?brandId=" + brandId + "&modelId=" + modelId);
  }

  getAllInfoCarByBrandModelAndYear(brandId: Number, modelId: Number, yearId: String){
    return this.http.get(this.fipeUrl + "/info?brandId=" + brandId + "&modelId=" + modelId + "&yearId=" + yearId);
  }
  
}
