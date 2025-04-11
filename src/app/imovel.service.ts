import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private apiUrl = 'http://127.0.0.1:8000/imoveis';

  constructor(private http: HttpClient) {}

  listarImoveis(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  cadastrarImovel(imovel: any): Observable<any> {
    return this.http.post(this.apiUrl, imovel);
  }

  atualizarImovel(idFirebase: string, dados: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${idFirebase}`, dados);
  }

  deletarImovel(idFirebase: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idFirebase}`);
  }
}
