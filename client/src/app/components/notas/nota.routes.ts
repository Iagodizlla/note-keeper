import { Routes } from '@angular/router';

import { NotaService } from './nota.service';

export const notaRoutes: Routes = [
  {
    path: '',
    children: [
      // { path: '', component: ListagemNotas }
    ],
    providers: [NotaService]
  }
];
