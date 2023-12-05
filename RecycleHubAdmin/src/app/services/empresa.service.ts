import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa.model';

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
}
