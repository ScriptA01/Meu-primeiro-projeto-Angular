import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonImovelComponent } from './button-imovel/button-imovel.component';
import { ButtonAcaoComponent } from './button-acao/button-acao.component';
import { ListaImoveisComponent } from './components/lista-imoveis/lista-imoveis.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonImovelComponent, ButtonAcaoComponent, ListaImoveisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto';
}
