import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModalMensagemComponent } from "./../../modal/modal-mensagem/modal-mensagem.component";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MensagemService } from '../../services/mensagem.service';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { Mensagem } from '../../models/mensagem.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css'],
})

export class MensagensComponent {
  mensagens: Mensagem[] = [];
  produtos: Produto[] = [];
  empresaLogadaString = this.cookieService.get('cookieEmpresa');
  empresaLogada: any = JSON.parse(this.empresaLogadaString || '{}');

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private mensagemService: MensagemService,
    private produtoService: ProdutoService
  ) {}

  idProduto: any = this.produtoService.getProdutosByCnpj(this.empresaLogada.cnpj);


  ngOnInit(): void {
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
    this.carregarMensagens();
  }
  carregarMensagens(): void {
    this.produtoService.getProdutosByCnpj(this.empresaLogada.cnpj).subscribe(
      produtos => {
        this.produtos = produtos;

        // Mapeie a lista de produtos para uma lista de observáveis de mensagens
        const observables = this.produtos.map(elemento =>
          this.mensagemService.getMensagensById(elemento.id)
        );

        // Use forkJoin para esperar por todas as chamadas assíncronas
        forkJoin(observables).subscribe(
          mensagens => {
            this.mensagens = mensagens.flat();
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
      console.log(this.mensagens)
    }

  acaoPrimaria() {
    console.log('Ação primária');
  }

}


