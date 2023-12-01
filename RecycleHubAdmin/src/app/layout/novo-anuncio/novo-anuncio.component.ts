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


@Component({
  selector: 'app-novo-anuncio',
  templateUrl: './novo-anuncio.component.html',
  styleUrls: ['./novo-anuncio.component.css'],
})
export class NovoAnuncioComponent implements OnInit {
  Anuncio!: FormGroup;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private produtoService: ProdutoService,
    private cookieService: CookieService
    ) {}

  ngOnInit(): void {
    const produto = this.produtoService.obterDadosProduto();

    this.Anuncio = this.builder.group({
    imagem: this.builder.control(''),
    nome: this.builder.control(''),
    preco: this.builder.control(''),
    unidadeMedida: this.builder.control(''),
    descricao: this.builder.control(''),
  });

  const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
  }



  errorMessage = '';
  PublicarAnuncio() {
    if (this.Anuncio.valid) {
      const produto = this.Anuncio.value;
      const empresaLogadaString = this.cookieService.get('cookieEmpresa');
      const empresaLogada: any = JSON.parse(empresaLogadaString || '{}');

      produto.status = 'Publicado';
      produto.empresa = empresaLogada
      this.produtoService.cadastrarProduto(produto).subscribe(
        response => {
          if (response.status === 200 || response.status === 201) {
            this.router.navigate(['/anuncios']);
          }
        },
        error => {
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
      produto.empresa = empresaLogada
      this.produtoService.cadastrarProduto(produto).subscribe(
        response => {
          if (response.status === 200 || response.status === 201) {
            this.router.navigate(['/anuncios']);
          }
        },
        error => {
          if (error.status === 200 || error.status === 201) {
            this.router.navigate(['/anuncios']);
          }
          //erro
        }
      );
    }
  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  unidadeMedida: string[] = ['KG', 'G', 'Unidade'];
}
