import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosComponent } from './anuncios.component';

describe('AnunciosComponent', () => {
  let component: AnunciosComponent;
  let fixture: ComponentFixture<AnunciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnunciosComponent]
    });
    fixture = TestBed.createComponent(AnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
