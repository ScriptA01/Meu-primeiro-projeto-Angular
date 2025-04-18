import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCadastroComponent } from './formulario-cadastro.component';
import { ImovelService } from '../../imovel.service';

describe('FormularioCadastroComponent', () => {
  let component: FormularioCadastroComponent;
  let fixture: ComponentFixture<FormularioCadastroComponent>;

   // Simula o serviço
   class MockImovelService {
    cadastrarImovel(dados: any) {
      return {
        subscribe: (callbacks: any) => {
          callbacks.next({ sucesso: true }); // simula sucesso
        }
      };
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCadastroComponent],
      providers: [
        { provide: ImovelService, useClass: MockImovelService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve injetar o serviço ImovelService', () => {
    expect(component['imovelService']).toBeDefined();
  });

  it('deve chamar cadastrarImovel com os dados corretos', () => {
    component.endereco = 'Rua Exemplo';
    component.numero = '123';
    component.proprietario = 'Maria';
    component.descricao = 'Casa linda';
    component.tipoNegociacao = 'venda';
    component.valor = 500000;
    component.imagemBase64 = 'base64fake';

    const expectedData = {
      endereco: 'Rua Exemplo',
      numero: '123',
      proprietario: 'Maria',
      descricao: 'Casa linda',
      imagem: 'base64fake',
      tipo: 'venda',
      valor: 500000
    };

    const serviceSpy = spyOn(component['imovelService'], 'cadastrarImovel').and.callThrough();
    const consoleLogSpy = spyOn(console, 'log');
    const fecharModalSpy = spyOn(component, 'fecharModal');

    component.salvar();

    expect(serviceSpy).toHaveBeenCalledWith(expectedData);
    expect(consoleLogSpy).toHaveBeenCalledWith('📦 Dados do formulário:', expectedData);
    expect(consoleLogSpy).toHaveBeenCalledWith('✅ Imóvel cadastrado com sucesso!', { sucesso: true });
    expect(fecharModalSpy).toHaveBeenCalled();
  });

});
 