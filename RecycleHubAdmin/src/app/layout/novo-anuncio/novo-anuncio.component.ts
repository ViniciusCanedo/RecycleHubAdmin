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
    ) {}

  ngOnInit(): void {
    const produto = this.produtoService.obterDadosProduto();

    this.Anuncio = this.builder.group({
    img: this.builder.control(''),
    titulo: this.builder.control(''),
    valor: this.builder.control(''),
    medida: this.builder.control(''),
    descricao: this.builder.control(''),
  });}



  errorMessage = '';
  PublicarAnuncio() {
    const produto = this.Anuncio.value;

    this.produtoService.cadastrarProduto(produto).subscribe(
      produtoResponse => {
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = 'Erro ao cadastrar empresa';
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

  medidas: string[] = ['kg', 'g', 'unidade'];
}
