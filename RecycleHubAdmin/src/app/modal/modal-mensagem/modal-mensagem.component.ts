import { Component, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-modal-mensagem',
  templateUrl: 'modal-mensagem.component.html',
  styleUrls: ['modal-mensagem.component.css'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('modal', [
      transition(':enter', [
        style({ top: -999 }),
        animate('500ms', style({ top: '50%' })),
      ]),
      transition(':leave', [
        animate('250ms', style({ top: -999 }))
      ])
    ]),
  ]
})
export class ModalMensagemComponent {
  @Input() mensagemSelecionada: any;
  @Input() mostrarModal: boolean = false;
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
  }

  mostrar: boolean = false;
  teste = {
    nome : "",
      numero: "",
      email: "" ,
      mensagem: ""
  }

  exibir (mensagem: any) {
    this.mensagemSelecionada = mensagem;
    this.mostrar = !this.mostrar;
  }

  close(){
    this.mensagemSelecionada = null;
    this.mostrarModal = false
  }
}
