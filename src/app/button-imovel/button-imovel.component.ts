import { Component } from '@angular/core';
import { FormularioCadastroComponent } from '../components/formulario-cadastro/formulario-cadastro.component';

@Component({
  selector: 'app-button-imovel',
  imports: [FormularioCadastroComponent],
  templateUrl: './button-imovel.component.html',
  styleUrl: './button-imovel.component.css'
})
export class ButtonImovelComponent {
  mostrarCadastro = false;

  greetForCadastro() {
    this.mostrarCadastro = true; // Exibe o formulário
  }
}
