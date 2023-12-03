import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaCategoriaComponent } from './nova-categoria.component';

describe('NovaCategoriaComponent', () => {
  let component: NovaCategoriaComponent;
  let fixture: ComponentFixture<NovaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovaCategoriaComponent]
    });
    fixture = TestBed.createComponent(NovaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
