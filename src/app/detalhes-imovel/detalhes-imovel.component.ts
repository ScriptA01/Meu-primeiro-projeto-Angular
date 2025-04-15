import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhes-imovel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes-imovel.component.html',
  styleUrl: './detalhes-imovel.component.css'
})
export class DetalhesImovelComponent {
  imovel: any;

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    this.imovel = navigation?.extras?.state?.['imovel'];
  }

  voltar(): void {
    this.location.back();
  }
}
