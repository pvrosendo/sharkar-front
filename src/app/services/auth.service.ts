import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.checkToken();
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      this.http.get(`${environment.apiUrlAuth}/validate-token`, {
        headers: { Authorization: `${token}` }
      }).subscribe({
        next: () => {
          this.isAuthenticatedSubject.next(true);
        },
        error: () => {
          this.removeToken();
          this.isAuthenticatedSubject.next(false);
        }
      });
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  handleAuthRedirect(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/register-cars']);
    } else {
      this.router.navigate(['/signin']);
    }
  }
} 