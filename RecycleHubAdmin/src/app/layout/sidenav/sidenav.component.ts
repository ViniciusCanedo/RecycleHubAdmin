import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isSpecialAccess: boolean = false;
  constructor(
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.isSpecialAccess = this.cookieService.get('adm') === 'true';
  }
}
