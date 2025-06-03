import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly baseUrlAuth = environment.apiUrlAuth;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrlAuth}/signin`, credentials, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('username', credentials.username);
      })
    );
  }

  register(user: any){
    return this.http.post(this.baseUrlAuth + "/createUser", user);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrlAuth}/signout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.router.navigate(['/login']);
        localStorage.removeItem('username');
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrlAuth}/validate-token`, {
      withCredentials: true
    });
  }

  refreshToken(username: string): Observable<any> {
    return this.http.put(`${this.baseUrlAuth}/refresh/${username}`, {
      withCredentials: true
    });
  }

  getUserInfo(username: string): Observable<any> {
    return this.http.get(`${this.baseUrlAuth}/user/${username}`, {
      withCredentials: true
    });
  }

  updateUSerInfo(userInfo: any): Observable<any> {
    return this.http.put(`${this.baseUrlAuth}/user/updateInfo`, userInfo, {
      withCredentials: true
    });
  }
}