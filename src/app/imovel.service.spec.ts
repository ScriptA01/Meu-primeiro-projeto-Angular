import { TestBed } from '@angular/core/testing';

import { ImovelService } from './imovel.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ImovelService', () => {
  let service: ImovelService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://127.0.0.1:8000/imoveis';
  const mockImovel = { id: 1, nome: 'Imóvel Exemplo', valor: 300000 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImovelService],
    });
    service = TestBed.inject(ImovelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list imóveis', () => {
    service.listarImoveis().subscribe((imoveis) => {
      expect(imoveis).toEqual([mockImovel]);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockImovel]);
  });

  it('should cadastrar imóvel', () => {
    service.cadastrarImovel(mockImovel).subscribe((response) => {
      expect(response).toEqual(mockImovel);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockImovel);
    req.flush(mockImovel);
  });

  it('should atualizar imóvel', () => {
    const idFirebase = '123';
    const updatedData = { nome: 'Imóvel Atualizado' };

    service.atualizarImovel(idFirebase, updatedData).subscribe((response) => {
      expect(response).toEqual(updatedData);
    });

    const req = httpMock.expectOne(`${apiUrl}/${idFirebase}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedData);
    req.flush(updatedData);
  });

  it('should delete imóvel', () => {
    const idFirebase = '123';

    service.deletarImovel(idFirebase).subscribe((response) => {
      expect(response).toEqual({ message: 'Imóvel deletado com sucesso' });
    });

    const req = httpMock.expectOne(`${apiUrl}/${idFirebase}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Imóvel deletado com sucesso' });
  });
});
