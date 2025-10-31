import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-listar-categorias',
  imports: [MatButtonModule, MatIconModule, MatCardModule, RouterLink, AsyncPipe],
  templateUrl: './listar-categorias.html',
})
export class ListarCategorias {
  protected readonly categoriaService = inject(CategoriaService);

  protected readonly categorias$ = this.categoriaService.selecionarTodas();
}