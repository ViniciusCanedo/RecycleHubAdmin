import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:4201';

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  login(email: string, senha: string): Observable<any> {
    const loginData = { email, senha };
    return this.http.post(`${this.baseUrl}/empresa/login`, loginData);
  }
  logout() {
    this.cookieService.delete('cookieEmpresa');
    this.router.navigate(['/login'])
  }
}
