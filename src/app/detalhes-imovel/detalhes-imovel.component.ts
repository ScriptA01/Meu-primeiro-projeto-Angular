import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ImovelService } from '../imovel.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-imovel',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detalhes-imovel.component.html',
  styleUrl: './detalhes-imovel.component.css'
})
export class DetalhesImovelComponent {
  imovel: any;
  editando = false; 
  valorFormatado: string = '';
  novaImagem: File | null = null;
  isLoading  = false;


  constructor(
    private router: Router,
    private location: Location,
    private imovelService: ImovelService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.imovel = navigation?.extras?.state?.['imovel'];
  }

  voltar(): void {
    this.location.back();
  }

  editar() {
    this.editando = true;
    this.valorFormatado = this.imovel.valor?.toString().replace('.', ',') || '';
  }

  salvar() {
    if (!this.imovel?.idFirebase) {
      alert('ID do imóvel não encontrado!');
      return;
    }

    this.isLoading = true;


    this.imovel.valor = this.converterParaNumero(this.valorFormatado);

    this.imovelService.atualizarImovel(this.imovel.idFirebase, this.imovel).subscribe({
      next: () => {
        alert('Imóvel atualizado com sucesso!');
        this.editando = false;
        this.isLoading  = false;
      },
      error: (err) => {
        console.error('Erro ao atualizar imóvel:', err);
        alert('Erro ao salvar as alterações.');
        this.isLoading  = false;
      }
    });
  }

  excluir() {
    const confirmado = window.confirm('Deseja mesmo excluir este imóvel?');
    if (!confirmado) return;

    this.imovelService.deletarImovel(this.imovel.idFirebase).subscribe({
      next: () => {
        alert('Imóvel excluído com sucesso!');
        window.location.href = '/lista-imoveis';
      },
      error: (err) => {
        console.error('Erro ao excluir imóvel:', err);
        alert('Erro ao excluir o imóvel. Tente novamente.');
      }
    });
  }

  selecionarNovaImagem(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.novaImagem = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imovel.imagem = reader.result as string;
      };
      reader.readAsDataURL(this.novaImagem);
    }
  }

  atualizarValor(valor: string): void {
    this.valorFormatado = valor;
  }

  converterParaNumero(valorFormatado: string): number {
    if (!valorFormatado) return 0;
    const numero = valorFormatado.replace(/\./g, '').replace(',', '.');
    return parseFloat(numero) || 0;
  }
}
