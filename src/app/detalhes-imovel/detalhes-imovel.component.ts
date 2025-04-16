import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ImovelService } from '../imovel.service';

@Component({
  selector: 'app-detalhes-imovel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes-imovel.component.html',
  styleUrl: './detalhes-imovel.component.css'
})
export class DetalhesImovelComponent {
  imovel: any;

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
    this.router.navigate(['/editar-imovel'], { state: { imovel: this.imovel } });
  }
  
  excluir() {
    const confirmado = window.confirm('Deseja mesmo excluir este imóvel?');
    if (!confirmado) return;
  
    this.imovelService.deletarImovel(this.imovel.idFirebase).subscribe({
      next: () => {
        alert('Imóvel excluído com sucesso!');
        // Redireciona para a lista com reload completo
        window.location.href = '/lista-imoveis';
      },
      error: (err) => {
        console.error('Erro ao excluir imóvel:', err);
        alert('Erro ao excluir o imóvel. Tente novamente.');
      }
    });
  }
  
}
