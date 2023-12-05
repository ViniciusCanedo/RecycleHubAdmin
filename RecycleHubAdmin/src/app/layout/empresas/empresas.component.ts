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
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
    this.carregarEmpresas();
  }

  carregarEmpresas(): void {
    this.empresaService.carregarEmpresas().subscribe(
      empresas => {
        this.todasEmpresas = empresas;
        this.empresas = this.todasEmpresas;
        this.carregarEmpresasNaoAprovadas();
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

  carregarEmpresasNaoAprovadas(): void {
    this.empresaService.carregarEmpresasNaoAprovadas().subscribe(
      empresas => {
        this.empresasBloqueadas = empresas;
      },
      error => {
        console.error('Erro ao carregar empresas não aprovadas', error);
      }
    );
  }
}
