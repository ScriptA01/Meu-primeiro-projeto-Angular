import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonImovelComponent } from './button-imovel/button-imovel.component';
import { ListaImoveisComponent } from './components/lista-imoveis/lista-imoveis.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonImovelComponent,  ListaImoveisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'projeto';
  searchTerm = '';

  @ViewChild(ListaImoveisComponent) listaImoveisComponent!: ListaImoveisComponent;

  ngAfterViewInit() {
    
  }

  onSearch(event: any) {
    const termo = event.target.value.toLowerCase();
    this.listaImoveisComponent.filtrarImoveis(termo);
  }

  limparFiltro() {
    this.searchTerm = ''; 
    window.location.reload();
  }

}
