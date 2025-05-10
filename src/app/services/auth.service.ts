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
    // Verifica o token ao inicializar o serviço
    this.checkToken();
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      // Verifica se o token é válido fazendo uma requisição para o backend
      this.http.get(`${environment.apiUrlAuth}/validate-token`, {
        headers: { Authorization: `${token}` }
      }).subscribe({
        next: () => {
          this.isAuthenticatedSubject.next(true);
        },
        error: () => {
          // Se o token for inválido, remove-o e atualiza o estado
          this.removeToken();
          this.isAuthenticatedSubject.next(false);
        }
      });
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  // Salva o token após o login
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
  }

  // Remove o token no logout
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  // Obtém o token atual
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Verifica se está autenticado
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Redireciona baseado no estado de autenticação
  handleAuthRedirect(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/register-cars']);
    } else {
      this.router.navigate(['/signin']);
    }
  }
} 