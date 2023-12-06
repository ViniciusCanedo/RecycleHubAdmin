import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

import { ProdutoService } from '../../services/produto.service';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-novo-anuncio',
  templateUrl: './novo-anuncio.component.html',
  styleUrls: ['./novo-anuncio.component.css'],
})
export class NovoAnuncioComponent implements OnInit {
  Anuncio!: FormGroup;
  routerUrl: string = '';
  produtoId: any;
  botaoTexto: string = 'Publicar';
  legenda: string = 'Novo anúncio';
  novo: boolean = true;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private produtoService: ProdutoService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.routerUrl = this.router.url
    if (this.routerUrl === '/editar-anuncio') {
      this.botaoTexto = 'Editar';
      this.legenda= 'Editar anúncio';
      this.novo = false;
      this.produtoId = this.cookieService.get('produtoId');
      this.produtoService.getProdutosById(this.produtoId).subscribe(
        (produto: Produto) => {
          this.Anuncio = this.builder.group({
            imagem: produto.imagem,
            nome: produto.nome,
            preco: produto.preco,
            categoria: ['', Validators.required],
            unidadeMedida: ['', Validators.required],
            descricao: produto.descricao,
          });
        },
        (error) => {
          console.error('Erro ao buscar produto:', error);
        }
      );
    } else {
      this.Anuncio = this.builder.group({
        imagem: '',
        nome: '',
        preco: '',
        categoria: '',
        unidadeMedida: '',
        descricao: '',
      });
    }
  }

  errorMessage = '';
  PublicarAnuncio() {
    if (this.Anuncio.valid) {
      const produto = this.Anuncio.value;
      const empresaLogadaString = this.cookieService.get('cookieEmpresa');
      const empresaLogada: any = JSON.parse(empresaLogadaString || '{}');

      produto.status = 'Publicado';
      produto.empresa = empresaLogada;
      this.produtoService.cadastrarProduto(produto).subscribe(
        (response) => {
          if (response.status === 200 || response.status === 201) {
            this.router.navigate(['/anuncios']);
          }
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {
            this.router.navigate(['/anuncios']);
          }
          //erro
        }
      );
    }
  }

  RascunhoAnuncio() {
    if (this.Anuncio.valid) {
      const produto = this.Anuncio.value;
      const empresaLogadaString = this.cookieService.get('cookieEmpresa');
      const empresaLogada: any = JSON.parse(empresaLogadaString || '{}');

      produto.status = 'Rascunho';
      produto.empresa = empresaLogada;
      this.produtoService.cadastrarProduto(produto).subscribe(
        (response) => {
          if (response.status === 200 || response.status === 201) {
            this.router.navigate(['/anuncios']);
          }
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {
            this.router.navigate(['/anuncios']);
          }
          //erro
        }
      );
    }
  }

  EditarAnuncio(){
    const produto = this.Anuncio.value;
    this.produtoService.editarProduto(this.produtoId, produto).subscribe(
      (response) => {
        if (response.status === 200 || response.status === 201) {
          this.router.navigate(['/anuncios']);
        }
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          this.router.navigate(['/anuncios']);
        }
        //erro
      }
    );
    this.router.navigate(['/anuncios']);
  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  unidadeMedida: string[] = ['KG', 'G', 'Unidade'];
  categoria: string[] = ['Metal', 'Vidro', 'Plástico'];

  HandleSubmit() {
    this.routerUrl = this.router.url;
    if (this.Anuncio.valid) {
      if (this.routerUrl === '/novo-anuncio') {
        this.PublicarAnuncio()
      } else if (this.routerUrl === '/editar-anuncio') {
        this.EditarAnuncio()
      }
    }
  }
}
