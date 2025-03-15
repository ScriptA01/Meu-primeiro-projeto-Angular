import { Component } from '@angular/core';

@Component({
  selector: 'app-button-imovel',
  imports: [],
  templateUrl: './button-imovel.component.html',
  styleUrl: './button-imovel.component.css'
})
export class ButtonImovelComponent {
  greetForCadastro() {
    console.log('Hello, there 👋');
  }
}
