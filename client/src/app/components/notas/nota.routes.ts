import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { ListarNotas } from './listar/listar-notas';
import { NotaService } from './nota.service';

const listagemNotasResolver = () => {
  const notaService = inject(NotaService);

  return notaService.selecionarTodas();
};

export const notaRoutes: Routes = [
  {
    path: '',
    children: [{ path: '', component: ListarNotas, resolve: { notas: listagemNotasResolver } }],
    providers: [NotaService],
  },
];
