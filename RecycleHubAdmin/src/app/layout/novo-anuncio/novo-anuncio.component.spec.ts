import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoAnuncioComponent } from './novo-anuncio.component';

describe('NovoAnuncioComponent', () => {
  let component: NovoAnuncioComponent;
  let fixture: ComponentFixture<NovoAnuncioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoAnuncioComponent]
    });
    fixture = TestBed.createComponent(NovoAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
