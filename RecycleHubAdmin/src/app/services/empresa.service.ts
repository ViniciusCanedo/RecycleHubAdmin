import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private dadosEmpresa: any;

  constructor() {}

  salvarDadosEmpresa(dados: any) {
    this.dadosEmpresa = dados;
  }

  obterDadosEmpresa() {
    return this.dadosEmpresa;
  }

  atualizarDadosEmpresa(novosDados: any) {
    this.dadosEmpresa = { ...this.dadosEmpresa, ...novosDados };
  }

  limparDadosEmpresa() {
    this.dadosEmpresa = null;
  }
}
