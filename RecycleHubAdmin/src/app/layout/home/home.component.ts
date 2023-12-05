import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
    const isSpecialAccess: boolean = this.cookieService.get('adm') === 'true';
    console.log('Acesso especial:', isSpecialAccess);
  }
}
