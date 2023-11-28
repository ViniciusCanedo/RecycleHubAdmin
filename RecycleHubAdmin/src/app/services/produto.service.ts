import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private baseUrl = 'http://localhost:4201';

  private dadosProduto: any;

  constructor(private http: HttpClient) {}

  obterDadosProduto() {
    return this.dadosProduto;
  }

  cadastrarProduto(dados: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/produto/cadastro`, dados);
  }
}
