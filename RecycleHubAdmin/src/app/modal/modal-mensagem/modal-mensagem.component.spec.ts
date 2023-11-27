import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagemComponent } from './modal-mensagem.component';

describe('ModalMensagemComponent', () => {
  let component: ModalMensagemComponent;
  let fixture: ComponentFixture<ModalMensagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMensagemComponent]
    });
    fixture = TestBed.createComponent(ModalMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
