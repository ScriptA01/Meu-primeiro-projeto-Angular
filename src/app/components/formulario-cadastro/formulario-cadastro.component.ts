import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ImovelService } from '../../imovel.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-formulario-cadastro',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgIf],
  templateUrl: './formulario-cadastro.component.html',
  styleUrl: './formulario-cadastro.component.css'
})
export class FormularioCadastroComponent {
  endereco: string = '';
  numero: string = '';
  proprietario: string = '';
  descricao: string = '';
  tipoNegociacao: string = ''; 
  valor: number | null = null;

  imagem: File | null = null;
  imagemBase64: string = '';
  imagemSelecionada: string = ''; 

  constructor(private imovelService: ImovelService) {}

  selecionarFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.imagem = input.files[0];
      this.imagemSelecionada = this.imagem.name; 
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemBase64 = reader.result as string;
      };
      reader.readAsDataURL(this.imagem);
    }
  }

  salvar() {
    const dados_formulario = {
      endereco: this.endereco,
      numero: this.numero,
      proprietario: this.proprietario,
      descricao: this.descricao,
      imagem: this.imagemBase64,
      tipo: this.tipoNegociacao,
      valor: this.valor
    };

    console.log('📦 Dados do formulário:', dados_formulario);

    this.imovelService.cadastrarImovel(dados_formulario).subscribe({
      next: (res) => {
        console.log('✅ Imóvel cadastrado com sucesso!', res);
        this.fecharModal();
      },
      error: (err) => {
        console.error('❌ Erro ao cadastrar imóvel:', err);
      }
    });
  }

  fecharModal() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modalOverlay');
    if (modal && overlay) {
      modal.style.display = 'none';
      overlay.style.display = 'none';
    }
    location.reload();
  }
}
