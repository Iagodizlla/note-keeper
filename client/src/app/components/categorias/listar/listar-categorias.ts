import { filter, map } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListagemCategoriasModel } from '../categoria.models';

import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-listar-categorias',
  imports: [MatButtonModule, MatIconModule, MatCardModule, RouterLink, AsyncPipe],
  templateUrl: './listar-categorias.html',
})
export class ListarCategorias {
  protected readonly route = inject(ActivatedRoute);
  protected readonly categoriaService = inject(CategoriaService);

  protected readonly categorias$ = this.route.data.pipe(
    filter((data) => data['categorias']),
    map((data) => data['categorias'] as ListagemCategoriasModel[]),
  );
}
