import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private baseUrl = 'http://localhost:4201';

  constructor(private http: HttpClient) {}

  cadastrarEmpresa(dados: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/empresa/cadastro`, dados);
  }
  cadastrarEndereco(cnpj: any, address: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/endereco/${cnpj}/cadastro/`, address);
  }
  cadastrarCategoria(nome: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categoria/cadastro/`, nome);
  }
}
