import { Component } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent {
  produtos: Produto[] = [];
  cnpjEmpresa = this.empresaService.obterDadosEmpresa().cnpj;

  constructor(private produtoService: ProdutoService, private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    console.log(this.produtos)
    this.produtoService.getProdutosByCnpj(this.cnpjEmpresa)
      .subscribe(
        produtos => {
          this.produtos = produtos;
        },
        error => {
          console.error('Erro ao buscar produtos:', error);
        }
      );
  }
}
