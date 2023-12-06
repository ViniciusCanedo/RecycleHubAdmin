import { Component } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent {

  produtos: Produto[] = [];
  empresaLogadaString = this.cookieService.get('cookieEmpresa');
  empresaLogada: any = JSON.parse(this.empresaLogadaString || '{}');

  constructor(private produtoService: ProdutoService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.carregarProdutos();
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
  }

  carregarProdutos(): void {
    this.produtoService.getProdutosByCnpj(this.empresaLogada.cnpj)
      .subscribe(
        produtos => {
          this.produtos = produtos;
        },
        error => {
          console.error('Erro ao buscar produtos:', error);
        }
      );
  }

  deletarProduto(id: any): void {
    console.log('a')
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.produtoService.deletarProduto(id)
        .subscribe(
          () => {
            this.carregarProdutos();
          },
          error => {
            if (error instanceof HttpErrorResponse && error.status === 200) {
              this.carregarProdutos();
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        );
    }
  }

  publicarProduto(id: any): void {
    if (confirm('Tem certeza que deseja publicar este produto?')) {
      this.produtoService.publicarProduto(id, 'Publicado')
        .subscribe(
          () => {
            this.carregarProdutos();
          },
          error => {
            if (error instanceof HttpErrorResponse && error.status === 200) {
              this.carregarProdutos();
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        );
    }
  }
}
