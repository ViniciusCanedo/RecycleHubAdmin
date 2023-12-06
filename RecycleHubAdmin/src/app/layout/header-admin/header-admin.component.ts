import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
})
export class HeaderAdminComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
  ) {}
  empresaLogadaString = this.cookieService.get('cookieEmpresa');
  empresaLogada: any = JSON.parse(this.empresaLogadaString || '{}');
  pathFoto: any;
  ngOnInit(): void {
    console.log(this.empresaLogada.imagem)
    if(this.empresaLogada.imagem != null){
      this.pathFoto = this.empresaLogada.imagem
    }
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    this.loginService.logout();
  }
}
