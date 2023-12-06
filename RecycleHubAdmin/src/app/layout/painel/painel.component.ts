import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoriaService } from '../../services/categoria.service';
import { EmpresaService } from '../../services/empresa.service';
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
  }
}
