import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonImovelComponent } from './button-imovel/button-imovel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonImovelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto';
}
