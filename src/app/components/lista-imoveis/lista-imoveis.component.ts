import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private imovelService: ImovelService, private router: Router) {}

  ngOnInit(): void {
    this.carregando = true;

    this.imovelService.listarImoveis().subscribe({
      next: (res) => {
        if (res && Object.keys(res).length > 0) {
          const imoveisBrutos = Object.values(res).map((imovel: any) => ({
            imagem: imovel.imagem || 'caminho/para/imagem/default.jpg',  // Imagem padrão se não tiver
            endereco: imovel.endereco || '',
            valor: imovel.valor || '',
            tipo: imovel.tipo || '',
            numero: imovel.numero || '',
            descricao: imovel.descricao || '',
            proprietario: imovel.proprietario || '',
            idFirebase: imovel.idFirebase || ''
          }));

          // Não filtra os imóveis sem foto, só garante que tenha dados importantes
          this.imoveis = imoveisBrutos.filter(imovel =>
            imovel.endereco && imovel.valor && imovel.tipo  // Garante que o imóvel tem dados essenciais
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

  abrirDetalhes(imovel: any): void {
    this.router.navigate(['/detalhes'], { state: { imovel } });
  }

  filtrarImoveis(termo: string): void {
    if (!termo) {
      this.atualizarPagina();
      return;
    }
  
    const filtrados = this.imoveis.filter(imovel =>
      imovel.endereco.toLowerCase().includes(termo)
    );
  
    this.imoveisPaginados = filtrados;
    this.totalPaginas = Math.ceil(filtrados.length / this.itensPorPagina);
    this.paginaAtual = 1;
  }
  
}

