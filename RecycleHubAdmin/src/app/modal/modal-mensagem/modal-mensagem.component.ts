import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

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
  mostrar: boolean = false;
  teste = {
    nome : "",
      numero: "",
      email: "" ,
      mensagem: ""
  }

  exibir (idMessagem: Number) {
    if (idMessagem == 1) {
      this.teste = {
        nome : "Fulano de Tal 1",
        numero: "(15) 12345-6789",
        email: "fulano.tal1@email.com" ,
        mensagem: "Teste de mensagem para ser exibida de acordo com o id fornecido pelo click."
      }
    }else{
      this.teste = {
        nome : "Fulano de Tal 2",
        numero: "(15) 12345-6789",
        email: "fulano.tal2@email.com" ,
        mensagem: "Teste de mensagem para ser exibida de acordo com o id fornecido pelo click.2"
      }
    }
    
    this.mostrar = !this.mostrar;    
  }

  close(){
    this.mostrar = false;
  }
}