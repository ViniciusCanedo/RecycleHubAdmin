import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild  } from '@angular/core';
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
import { HttpErrorResponse } from '@angular/common/http';
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
  @ViewChild(ModalMensagemComponent) modal: ModalMensagemComponent | undefined;
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer: ViewContainerRef | undefined;

  mensagemSelecionada: Mensagem | null = null;
  mostrarModal: boolean = false;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private mensagemService: MensagemService,
    private produtoService: ProdutoService,
    private componentFactoryResolver: ComponentFactoryResolver
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
        const observables = this.produtos.map(elemento =>
          this.mensagemService.getMensagensById(elemento.id)
        );
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
    }

  acaoPrimaria() {
    console.log('Ação primária');
  }

  exibirDetalhes(mensagem: any): void {
    this.mensagemSelecionada = mensagem;
    this.abrirModal();
  }

  abrirModal(): void {
    this.modalContainer?.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalMensagemComponent);
    const componentRef = this.modalContainer?.createComponent(factory);
    if (componentRef && this.mensagemSelecionada) {
      componentRef.instance.mensagemSelecionada = this.mensagemSelecionada;
      componentRef.instance.mostrarModal = true; // Define a variável para exibir o novo modal
    }
  }

  deletarMensagem(id: any): void {
    console.log('a')
    if (confirm('Tem certeza que deseja deletar esta mensagem?')) {
      this.mensagemService.deletarMensagem(id)
        .subscribe(
          () => {
            this.carregarMensagens();
          },
          error => {
            if (error instanceof HttpErrorResponse && error.status === 200) {
              this.carregarMensagens();
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        );
    }
  }
}


