import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../_models/auth';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = environment.apiUrlAuth;
 
  constructor(private http: HttpClient) { }

  signIn(userCredentials: any) {

    const response = this.http.post(this.authUrl + "/signin", userCredentials);

    console.log(response);
    
    response.subscribe((res: any) => {
      localStorage.setItem("token", res.body.accessToken);
      localStorage.setItem("user", JSON.stringify(res.body.email));
    });

    return response;
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  refreshToken(username: string){
    const token = localStorage.getItem("token");
    return this.http.put(this.authUrl + "/refresh/" + username, {token});
  }

  register(user: any){
    return this.http.post(this.authUrl + "/createUser", user);
  }

  signOut(){
    localStorage.removeItem("token");
  }
}