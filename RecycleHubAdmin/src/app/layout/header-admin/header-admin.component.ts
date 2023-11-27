import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
})
export class HeaderAdminComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    this.loginService.logout();
  }
}
