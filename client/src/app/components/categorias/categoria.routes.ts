import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';

import { ListagemCategoriasModel } from './categoria.models';
import { CategoriaService } from './categoria.service';
import { ListarCategorias } from './listar/listar-categorias';
import { CadastrarCategoria } from './cadastrar/cadastrar-categoria';
import { ExcluirCategoria } from './excluir/excluir-categoria';
import { EditarCategoria } from './editar/editar-categoria';

const listagemCategoriasResolver: ResolveFn<ListagemCategoriasModel[]> = () => {
  const categoriaService = inject(CategoriaService);

  return categoriaService.selecionarTodas();
};

const detalhesCategoriaResolver = (route: ActivatedRouteSnapshot) => {
  const categoriaService = inject(CategoriaService);

  if (!route.paramMap.has('id')) throw new Error('O parâmetro id não foi fornecido.');

  const categoriaId = route.paramMap.get('id')!;

  return categoriaService.selecionarPorId(categoriaId);
};

export const categoriaRoutes: Routes = [
  {
    path: '',
    component: ListarCategorias,
    resolve: { categorias: listagemCategoriasResolver },
  },
  { path: 'cadastrar', component: CadastrarCategoria },
  {
    path: 'editar/:id',
    component: EditarCategoria,
    resolve: { categoria: detalhesCategoriaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirCategoria,
    resolve: { categoria: detalhesCategoriaResolver },
  },
];
