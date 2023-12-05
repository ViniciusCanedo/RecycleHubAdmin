import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    const isSpecialAccess: boolean = this.cookieService.get('adm') === 'true';
    if (!isCookieExists || !isSpecialAccess) {
      this.router.navigate(['/login']);
    }
  }
}
