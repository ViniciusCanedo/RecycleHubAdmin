import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoriaService } from '../../services/categoria.service';
import { EmpresaService } from '../../services/empresa.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent {
  totalCategorias: any = 0;
  totalEmpresas: any = 0;
  constructor(
    private cookieService: CookieService,
    private categoriaService: CategoriaService,
    private empresaService: EmpresaService,
    private router: Router,
  ) {}

  empresas: any[] = [];

  ngOnInit(): void {
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    const isSpecialAccess: boolean = this.cookieService.get('adm') === 'true';
    if (!isCookieExists || !isSpecialAccess) {
      this.router.navigate(['/login']);
    }
    this.totalCategorias = this.categoriaService.contarCategorias().subscribe(
      (result: any) => {
        this.totalCategorias = result;
      },
      (error: any) => {
        console.error('Erro ao obter as categorias:', error);
      }
    );
    this.totalEmpresas = this.empresaService.contarEmpresas().subscribe(
      (result: any) => {
        this.totalEmpresas = result;
      },
      (error: any) => {
        console.error('Erro ao obter as empresas:', error);
      }
    );
    this.carregarEmpresasNaoAprovadas();
  }

  carregarEmpresasNaoAprovadas(): void {
    this.empresaService.carregarEmpresasNaoAprovadas().subscribe(
      empresas => {
        this.empresas = empresas;
      },
      error => {
        console.error('Erro ao carregar empresas não aprovadas', error);
      }
    );
  }

  bloquearEmpresa(id: any): void {
    if (confirm('Tem certeza que deseja bloquear este empresa?')) {
      this.empresaService.bloquearEmpresa(id, 'Bloqueada')
        .subscribe(
          (response: any) => {
            this.carregarEmpresasNaoAprovadas();
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse && error.status === 200) {
              this.carregarEmpresasNaoAprovadas();
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        );
    }
  }

  aprovarEmpresa(id: any): void {
    if (confirm('Tem certeza que deseja aprovar este empresa?')) {
      this.empresaService.aprovarEmpresa(id, 'Aprovada')
        .subscribe(
          (response: any) => {
            this.carregarEmpresasNaoAprovadas();
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse && error.status === 200) {
              this.carregarEmpresasNaoAprovadas();
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        );
    }
  }
}
