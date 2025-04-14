import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImovelService } from '../../imovel.service';

@Component({
  selector: 'app-lista-imoveis',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-imoveis.component.html',
  styleUrls: ['./lista-imoveis.component.css']
})
export class ListaImoveisComponent {

  carregando = true;
  imoveis: any[] = [];
  imoveisPaginados: any[] = [];
  paginaAtual = 1;
  itensPorPagina = 4;
  totalPaginas = 1;

  constructor(private imovelService: ImovelService) {}

  ngOnInit(): void {
    this.carregando = true;

    this.imovelService.listarImoveis().subscribe({
      next: (res) => {
        if (res && Object.keys(res).length > 0) {
          const imoveisBrutos = Object.values(res).map((imovel: any) => ({
            imagem: imovel.imagem || '',
            endereco: imovel.endereco || '',
            valor: imovel.valor || '',
            tipo: imovel.tipo || ''
          }));

          // Filtra apenas os imóveis completos
          this.imoveis = imoveisBrutos.filter(imovel =>
            imovel.imagem && imovel.endereco && imovel.valor && imovel.tipo
          );

          this.totalPaginas = Math.ceil(this.imoveis.length / this.itensPorPagina);
          this.atualizarPagina();
        } else {
          this.imoveis = [];
          this.imoveisPaginados = [];
        }

        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar imóveis:', err);
        this.imoveis = [];
        this.imoveisPaginados = [];
        this.carregando = false;
      }
    });
  }

  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.imoveisPaginados = this.imoveis.slice(inicio, fim);
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPagina();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPagina();
    }
  }

  
  
}