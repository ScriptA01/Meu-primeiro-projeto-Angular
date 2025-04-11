import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ImovelService } from '../../imovel.service';

@Component({
  selector: 'app-formulario-cadastro',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './formulario-cadastro.component.html',
  styleUrl: './formulario-cadastro.component.css'
})
export class FormularioCadastroComponent {

  endereco: string = '';
  numero: string = '';
  proprietario: string = '';
  descricao: string = '';
  imagem: File | null = null;

  constructor(private imovelService: ImovelService) {}

  selecionarFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.imagem = input.files[0];
    }
  }

  salvar() {
    const dados_formulario = {
      endereco: this.endereco,
      numero: this.numero,
      proprietario: this.proprietario,
      descricao: this.descricao
      // imagem: this.imagem // ❌ removido por enquanto
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
