import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesImovelComponent } from './detalhes-imovel.component';

describe('DetalhesImovelComponent', () => {
  let component: DetalhesImovelComponent;
  let fixture: ComponentFixture<DetalhesImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesImovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
