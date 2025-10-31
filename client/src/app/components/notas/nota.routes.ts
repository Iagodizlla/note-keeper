import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { CategoriaService } from '../categorias/categoria.service';
import { CadastrarNota } from './cadastrar/cadastrar-nota';
import { EditarNota } from './editar/editar-nota';
import { ExcluirNota } from './excluir/excluir-nota';
import { ListarNotas } from './listar/listar-notas';
import { NotaService } from './nota.service';

const listagemNotasResolver = () => {
  const notaService = inject(NotaService);

  return notaService.selecionarTodas();
};

const detalhesNotaResolver = (route: ActivatedRouteSnapshot) => {
  const notaService = inject(NotaService);

  if (!route.paramMap.has('id')) throw new Error('O parâmetro id não foi fornecido.');

  const notaId = route.paramMap.get('id')!;

  return notaService.selecionarPorId(notaId);
};

const listagemCategoriasResolver = () => {
  const categoriaService = inject(CategoriaService);

  return categoriaService.selecionarTodas();
};

export const notaRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListarNotas, resolve: { notas: listagemNotasResolver } },
      {
        path: 'cadastrar',
        component: CadastrarNota,
        resolve: { categorias: listagemCategoriasResolver },
      },
      {
        path: 'editar/:id',
        component: EditarNota,
        resolve: { nota: detalhesNotaResolver, categorias: listagemCategoriasResolver },
      },
      {
        path: 'excluir/:id',
        component: ExcluirNota,
        resolve: { nota: detalhesNotaResolver },
      },
    ],
    providers: [NotaService, CategoriaService],
  },
];
