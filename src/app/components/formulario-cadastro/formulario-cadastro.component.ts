import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ImovelService } from '../../imovel.service';
import { NgIf } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-formulario-cadastro',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgIf, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './formulario-cadastro.component.html',
  styleUrl: './formulario-cadastro.component.css'
})
export class FormularioCadastroComponent {
  endereco: string = '';
  numero: string = '';
  proprietario: string = '';
  descricao: string = '';
  tipoNegociacao: string = ''; 
  valor: string = '';

  imagem: File | null = null;
  imagemBase64: string = '';
  imagemSelecionada: string = ''; 

  isLoading: boolean = false;

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
    this.isLoading = true;

    const valorNumerico = this.valor && typeof this.valor === 'string'
  ? Number(this.valor.replace(/\./g, '').replace(',', '.'))
  : 0;
  
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
        this.isLoading = false;
        this.fecharModal();
      },
      error: (err) => {
        console.error('❌ Erro ao cadastrar imóvel:', err);
        this.isLoading = false;
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
