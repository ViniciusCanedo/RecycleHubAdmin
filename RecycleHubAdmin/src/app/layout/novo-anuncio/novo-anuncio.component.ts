import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ProdutoService } from '../../services/produto.service';
import { EmpresaService } from '../../services/empresa.service';


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
    private empresaService: EmpresaService,
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
  }



  errorMessage = '';
  PublicarAnuncio() {
    const produto = this.Anuncio.value;
    produto.status = 'Publicado';
    produto.empresa = this.empresaService.obterDadosEmpresa()
    console.log
    console.log(produto)
    this.produtoService.cadastrarProduto(produto).subscribe(
      produtoResponse => {
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = 'Erro ao cadastrar produto';
      },
    )
  }

  RascunhoAnuncio() {
    const produto = this.Anuncio.value;
    produto.status = 'Rascunho';
    produto.empresa = this.empresaService.obterDadosEmpresa()
    console.log(produto)
    this.produtoService.cadastrarProduto(produto).subscribe(
      produtoResponse => {
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = 'Erro ao cadastrar produto';
      },
    )
  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  SalvarRascunho() {
    if (this.Anuncio.valid) {
      console.log('Salvo como rascunho');
    }
  }

  unidadeMedida: string[] = ['KG', 'G', 'Unidade'];
}
