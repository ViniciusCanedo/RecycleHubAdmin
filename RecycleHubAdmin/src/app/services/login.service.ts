import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:4201';

  constructor(private http: HttpClient, private router: Router, private empresaService: EmpresaService) {}

  login(email: string, senha: string): Observable<any> {
    const loginData = { email, senha };
    return this.http.post(`${this.baseUrl}/empresa/login`, loginData);
  }
  logout() {
    this.empresaService.limparDadosEmpresa();
    this.router.navigate(['/login'])
  }
}
