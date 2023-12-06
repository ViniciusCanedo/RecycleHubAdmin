import { Component } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})

export class EmpresasComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private empresaService: EmpresaService,
  ) {}
  todasEmpresas: any[] = [];
  empresasBloqueadas: any[] = [];
  empresas: any[] = [];

  ngOnInit(): void {
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    const isSpecialAccess: boolean = this.cookieService.get('adm') === 'true';
    if (!isCookieExists || !isSpecialAccess) {
      this.router.navigate(['/login']);
    }
    this.carregarEmpresas();
  }

  carregarEmpresas(): void {
    this.empresaService.carregarEmpresas().subscribe(
      empresas => {
        this.todasEmpresas = empresas;
        this.empresas = this.todasEmpresas;
        this.carregarEmpresasBloqueadas();
      },
      error => {
        console.error('Erro ao carregar empresa', error);
      }
    );
  }

  exibirTodasEmpresas(): void {
    this.empresas = this.todasEmpresas;
  }

  exibirEmpresasBloqueadas(): void {
    this.empresas = this.empresasBloqueadas;
  }

  carregarEmpresasBloqueadas(): void {
    this.empresaService.carregarEmpresasBloqueadas().subscribe(
      empresas => {
        this.empresasBloqueadas = empresas;
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
            this.carregarEmpresas();
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse && error.status === 200) {
              this.carregarEmpresas();
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        );
    }
  }
}
