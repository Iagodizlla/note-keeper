import { filter, map } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ListagemNotasModel } from '../nota.models';

@Component({
  selector: 'app-listar-notas',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, RouterLink, AsyncPipe],
  templateUrl: './listar-notas.html',
})
export class ListarNotas {
  protected readonly route = inject(ActivatedRoute);

  protected readonly notas$ = this.route.data.pipe(
    filter((data) => data['notas']),
    map((data) => data['notas'] as ListagemNotasModel[]),
  );
}
