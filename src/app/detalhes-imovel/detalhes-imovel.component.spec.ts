import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesImovelComponent } from './detalhes-imovel.component';
import { Router } from '@angular/router';
import { ImovelService } from '../imovel.service';

describe('DetalhesImovelComponent', () => {
  let component: DetalhesImovelComponent;
  let fixture: ComponentFixture<DetalhesImovelComponent>;
  let mockRouter: any;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockImovelService: jasmine.SpyObj<ImovelService>;

  const mockImovel = {
    imagem: 'img.png',
    endereco: 'Rua Teste',
    valor: 123000,
    tipo: 'aluguel',
    numero: '10',
    descricao: 'Apartamento legal',
    proprietario: 'Fulano',
    idFirebase: 'abc123'
  };

  beforeEach(async () => {
    mockRouter = {
      getCurrentNavigation: () => ({
        extras: {
          state: {
            imovel: mockImovel
          }
        }
      })
    };

    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockImovelService = jasmine.createSpyObj('ImovelService', ['atualizarImovel', 'deletarImovel']);

    await TestBed.configureTestingModule({
      imports: [DetalhesImovelComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation },
        { provide: ImovelService, useValue: mockImovelService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // chama o construtor e ngOnInit
  });

  it('deve receber o imóvel via navegação e armazená-lo', () => {
    expect(component.imovel).toEqual(mockImovel);
  });
});
