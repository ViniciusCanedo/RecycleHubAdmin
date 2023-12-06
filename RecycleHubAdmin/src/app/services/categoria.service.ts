import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
    providedIn: 'root',
  })
  export class CategoriaService {
    private baseUrl = 'http://localhost:4201';
  constructor(private http: HttpClient) {}

  deletarCategoria(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categoria/deletar/${id}`);
  }
  carregarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categoria/listar`);
  }

  contarCategorias(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categoria/contarCategorias`);
  }
}
