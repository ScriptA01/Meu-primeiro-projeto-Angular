import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaImoveisComponent } from './lista-imoveis.component';
import { ImovelService } from '../../imovel.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ListaImoveisComponent', () => {
  let component: ListaImoveisComponent;
  let fixture: ComponentFixture<ListaImoveisComponent>;
  let mockImovelService: jasmine.SpyObj<ImovelService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockImovelService = jasmine.createSpyObj('ImovelService', ['listarImoveis']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ListaImoveisComponent],
      providers: [
        { provide: ImovelService, useValue: mockImovelService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaImoveisComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar imóveis corretamente e setar variáveis', () => {
    const dadosMock = [
      {
        imagem: 'img.png',
        endereco: 'Rua A',
        valor: 100000,
        tipo: 'venda',
        numero: '123',
        descricao: 'Linda casa',
        idFirebase: 'id1'
      },
      {
        imagem: '',
        endereco: 'Rua B',
        valor: 200000,
        tipo: 'aluguel',
        numero: '456',
        descricao: 'Apartamento top',
        idFirebase: 'id2'
      }
    ];
  
    mockImovelService.listarImoveis.and.returnValue(of(dadosMock)); 
  
    fixture.detectChanges(); 
    component.ngOnInit(); 
  
    
    expect(component.carregando).toBeFalse();
    expect(component.imoveis.length).toBe(2);  
    expect(component.imoveis[0].endereco).toBe('Rua A');
    expect(component.imoveis[1].endereco).toBe('Rua B');
    expect(component.imoveisPaginados.length).toBeGreaterThan(0);
    expect(component.totalPaginas).toBe(1);
  });

  it('deve lidar com erro ao carregar imóveis', () => {
    mockImovelService.listarImoveis.and.returnValue(throwError(() => new Error('Erro')));
    spyOn(console, 'error');
    component.ngOnInit();

    expect(console.error).toHaveBeenCalled();
    expect(component.imoveis).toEqual([]);
    expect(component.imoveisPaginados).toEqual([]);
    expect(component.carregando).toBeFalse();
  });

  it('deve filtrar imóveis corretamente', () => {
    component.imoveis = [
      { endereco: 'Rua Alpha' },
      { endereco: 'Rua Beta' },
      { endereco: 'Rua Gama' }
    ] as any[];

    component.filtrarImoveis('beta');

    expect(component.imoveisPaginados.length).toBe(1);
    expect(component.imoveisPaginados[0].endereco).toBe('Rua Beta');
    expect(component.totalPaginas).toBe(1);
    expect(component.paginaAtual).toBe(1);
  });

  it('deve resetar filtro se termo for vazio', () => {
    const atualizarPaginaSpy = spyOn(component, 'atualizarPagina');
    component.filtrarImoveis('');
    expect(atualizarPaginaSpy).toHaveBeenCalled();
  });

  it('deve navegar para próxima página se possível', () => {
    component.totalPaginas = 3;
    component.paginaAtual = 1;
    const atualizarSpy = spyOn(component, 'atualizarPagina');
    component.proximaPagina();
    expect(component.paginaAtual).toBe(2);
    expect(atualizarSpy).toHaveBeenCalled();
  });

  it('deve navegar para página anterior se possível', () => {
    component.paginaAtual = 2;
    const atualizarSpy = spyOn(component, 'atualizarPagina');
    component.paginaAnterior();
    expect(component.paginaAtual).toBe(1);
    expect(atualizarSpy).toHaveBeenCalled();
  });

  it('deve navegar para os detalhes do imóvel', () => {
    const mockImovel = { endereco: 'Rua Teste' };
    component.abrirDetalhes(mockImovel);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detalhes'], { state: { imovel: mockImovel } });
  });
});
