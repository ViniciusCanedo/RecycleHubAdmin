import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private categoriaService: CategoriaService,
  ) {}
  categorias:any[]=[];

  ngOnInit(): void {
    this.carregarCategorias();
  }
  
  carregarCategorias(): void {
    this.categoriaService.carregarCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
      },
      error => {
        console.error('Erro ao carregar categorias', error);
      }
    );
    }


  deletarCategoria(id: any): void {
    if (confirm('Tem certeza que deseja deletar esta categoria?')) {
      this.categoriaService.deletarCategoria(id)
        .subscribe(
          () => {
            this.carregarCategorias();
          },
          error => {
            if (error instanceof HttpErrorResponse && error.status === 200) {
              this.carregarCategorias();
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        );
    }
  }
}
