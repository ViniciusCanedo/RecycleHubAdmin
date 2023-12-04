import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem.model';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  private baseUrl = 'http://localhost:4201';

  private dadosMensagem: any;

  constructor(private http: HttpClient) {}

  obterDadosMensagem() {
    return this.dadosMensagem;
  }

  getMensagensById(id: number): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(`${this.baseUrl}/mensagem/listarPorProduto/${id}`);
  }

  deletarMensagem(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/mensagem/deletar/${id}`);
  }
}
