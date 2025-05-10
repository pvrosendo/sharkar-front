import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarFipeService {

  fipeUrl: string = environment.apiUrlFipe;
 
  constructor(private http: HttpClient, private authService: AuthService) { }


  getAllBrands(){
    const token = this.authService.getToken()
    if (token) {
      var request = this.http.get(this.fipeUrl + "/brands", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return request;
    }
    return throwError(() => new Error("Token not found"));
  }

  getAllModelsByBrand(brandId: Number){
    const token = this.authService.getToken()
    if (token) {
      var request = this.http.get(this.fipeUrl + "/models?brandId=" + brandId, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return request;
    }
    return throwError(() => new Error("Token not found"));
  }

  getAllYearsByBrandAndModel(brandId: Number, modelId: Number){

    const token = this.authService.getToken()
    if (token) {
      var request = this.http.get(this.fipeUrl + "/years?brandId=" + brandId + "&modelId=" + modelId, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return request;
    }
    return throwError(() => new Error("Token not found"));

  }

  getAllInfoCarByBrandModelAndYear(brandId: Number, modelId: Number, yearId: String){

    const token = this.authService.getToken()
    if (token) {
      var request = this.http.get(this.fipeUrl + "/info?brandId=" + brandId + "&modelId=" + modelId + "&yearId=" + yearId, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return request;
    }
    return throwError(() => new Error("Token not found"));
  }
  
}
