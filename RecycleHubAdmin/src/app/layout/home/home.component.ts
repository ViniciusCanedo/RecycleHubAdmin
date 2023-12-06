import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  produtos: Produto[] = [];
  totalAnuncios: any = 0;
  totalVisualizacoes: any = 0;
  empresaLogadaString = this.cookieService.get('cookieEmpresa');
  empresaLogada: any = JSON.parse(this.empresaLogadaString || '{}');
  constructor(
    private cookieService: CookieService,
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
    const isSpecialAccess: boolean = this.cookieService.get('adm') === 'true';
    this.totalVisualizacoes = this.produtoService.obterVisualizacoes(this.empresaLogada.cnpj).subscribe(
      (result: any) => {
        this.totalVisualizacoes = result;
      },
      (error: any) => {
        console.error('Erro ao obter as visualizações:', error);
      }
    );
    this.totalAnuncios = this.produtoService.contarAnuncios(this.empresaLogada.cnpj).subscribe(
      (result: any) => {
        this.totalAnuncios = result;
      },
      (error: any) => {
        console.error('Erro ao obter os produtos:', error);
      }
    );
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutosNaoPublicadoByCnpj(this.empresaLogada.cnpj)
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
