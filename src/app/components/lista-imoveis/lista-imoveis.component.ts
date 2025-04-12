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

  imoveis: any[] = [];

  constructor(private imovelService: ImovelService) {}

  ngOnInit(): void {
    this.imovelService.listarImoveis().subscribe({
      next: (res) => {
        if (res) {
          this.imoveis = Object.values(res).map((imovel: any) => ({
            imagem: imovel.imagem,
            endereco: imovel.endereco
          }));
        } else {
          this.imoveis = [];
        }
      },
      error: (err) => {
        console.error('Erro ao carregar imóveis:', err);
      }
    });
  }
  
}