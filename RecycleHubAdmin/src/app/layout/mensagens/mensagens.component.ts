import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModalMensagemComponent } from "./../../modal/modal-mensagem/modal-mensagem.component";

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css'],
})

export class MensagensComponent {
  acaoPrimaria() {
    console.log('Ação primária');
  }

}


