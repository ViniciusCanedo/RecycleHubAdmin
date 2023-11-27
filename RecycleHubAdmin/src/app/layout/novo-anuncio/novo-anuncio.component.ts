import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-novo-anuncio',
  templateUrl: './novo-anuncio.component.html',
  styleUrls: ['./novo-anuncio.component.css'],
})
export class NovoAnuncioComponent implements OnInit {
  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {}

  Anuncio = this.builder.group({
    img: this.builder.control(''),
    titulo: this.builder.control(''),
    valor: this.builder.control(''),
    medida: this.builder.control(''),
    descricao: this.builder.control(''),
  });

  PublicarAnuncio() {
    if (this.Anuncio.valid) {
      console.log(this.Anuncio.value);
    }
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
