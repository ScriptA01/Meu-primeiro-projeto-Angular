import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonImovelComponent } from './button-imovel.component';

describe('ButtonImovelComponent', () => {
  let component: ButtonImovelComponent;
  let fixture: ComponentFixture<ButtonImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonImovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
