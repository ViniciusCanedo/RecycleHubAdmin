import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa.model';
import { Endereco } from '../models/endereco.model';

@Injectable({
    providedIn: 'root',
  })
  export class EmpresaService {
    private baseUrl = 'http://localhost:4201';
  constructor(private http: HttpClient) {}

  carregarEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}/empresa/listar`);
  }

  carregarEmpresasAprovadas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}/empresa/listar/aprovadas`);
  }

  carregarEmpresasNaoAprovadas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}/empresa/listar/nao-aprovadas`);
  }

  carregarEmpresasBloqueadas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}/empresa/listar/bloqueadas`);
  }

  contarEmpresas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/empresa/contarEmpresas`);
  }

  editarEmpresa(cnpj:string, dados: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/empresa/editar/${cnpj}`, dados);
  }

  editarEndereco(id:any, dados: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/endereco/editar/${id}`, dados);
  }

  getEnderecosByCnpj(cnpj: string): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.baseUrl}/endereco/listarPorEmpresa/${cnpj}`);
  }

  excluirEndereco(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/endereco/deletar/${id}`);
  }

  bloquearEmpresa(cnpj: string, novoStatus: any): Observable<any> {
    const body = { novoStatus: novoStatus };
    return this.http.put(`${this.baseUrl}/empresa/bloquear/${cnpj}`, body);
  }

  aprovarEmpresa(cnpj: string, novoStatus: any): Observable<any> {
    const body = { novoStatus: novoStatus };
    return this.http.put(`${this.baseUrl}/empresa/aprovar/${cnpj}`, body);
  }
}
