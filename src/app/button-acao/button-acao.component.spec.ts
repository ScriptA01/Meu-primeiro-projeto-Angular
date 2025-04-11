import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAcaoComponent } from './button-acao.component';

describe('ButtonAcaoComponent', () => {
  let component: ButtonAcaoComponent;
  let fixture: ComponentFixture<ButtonAcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAcaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
