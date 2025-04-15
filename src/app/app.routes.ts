import { Routes } from '@angular/router';
import { FormularioCadastroComponent } from './components/formulario-cadastro/formulario-cadastro.component';
import { ListaImoveisComponent } from './components/lista-imoveis/lista-imoveis.component';
import { DetalhesImovelComponent } from './detalhes-imovel/detalhes-imovel.component';

export const routes: Routes = [
    
  { path: 'detalhes', component: DetalhesImovelComponent },
];
