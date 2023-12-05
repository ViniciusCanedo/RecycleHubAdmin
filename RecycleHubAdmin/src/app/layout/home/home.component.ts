import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalVisualizacoes: any = 0;
  constructor(
    private cookieService: CookieService,
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
    const isSpecialAccess: boolean = this.cookieService.get('adm') === 'true';
    console.log('Acesso especial:', isSpecialAccess);
    this.totalVisualizacoes = this.produtoService.obterVisualizacoes().subscribe(
      (result: any) => {
        this.totalVisualizacoes = result;
      },
      (error: any) => {
        console.error('Erro ao obter as visualizações:', error);
      }
    );
  }
}
