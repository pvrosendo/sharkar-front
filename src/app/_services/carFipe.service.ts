import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarFipeService {

  fipeUrl: string = environment.apiUrlFipe;
 
  constructor(private http: HttpClient, private authService: AuthService) { }


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
