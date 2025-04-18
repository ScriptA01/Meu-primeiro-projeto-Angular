import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ListaImoveisComponent } from './components/lista-imoveis/lista-imoveis.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, 
        ListaImoveisComponent, 
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // esperar o AfterViewInit
    await fixture.whenStable();
  });

  it('deve chamar filtrarImoveis ao digitar no campo de busca', () => {
    const spy = spyOn(component.listaImoveisComponent, 'filtrarImoveis');
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'apartamento';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('apartamento');
  });
});

// OBS: No meu VS Code o "HttpClientTestingModule" aparece tachado, mas ele está sendo usado no teste.