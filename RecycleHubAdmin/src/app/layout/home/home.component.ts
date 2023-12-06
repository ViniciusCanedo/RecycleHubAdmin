import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { MensagemService } from '../../services/mensagem.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Mensagem } from 'src/app/models/mensagem.model';
import { forkJoin } from 'rxjs';

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
  mensagens: Mensagem[] = [];
  quantidadeMensagens: any = 0;
  constructor(
    private cookieService: CookieService,
    private produtoService: ProdutoService,
    private mensagemService: MensagemService,
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
    this.carregarMensagens();
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

  editarAnuncio(id: any): void {
    this.cookieService.set('produtoId', id);
    this.router.navigate(['/editar-anuncio']);
  }

  carregarMensagens(): void {
    this.produtoService.getProdutosByCnpj(this.empresaLogada.cnpj).subscribe(
      produtos => {
        this.produtos = produtos;
        const observables = this.produtos.map(elemento =>
          this.mensagemService.getMensagensById(elemento.id)
        );
        forkJoin(observables).subscribe(
          mensagens => {
            this.mensagens = mensagens.flat();
            this.quantidadeMensagens = this.mensagens.length;
          },
          error => {
            console.error('Erro ao buscar mensagens:', error);
          }
        );
      },
      error => {
        console.error('Erro ao buscar produtos:', error);
      }
    );
    }
}
