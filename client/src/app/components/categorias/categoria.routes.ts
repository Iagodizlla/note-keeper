import { Routes } from '@angular/router';

import { ListarCategorias } from './listar/listar-categorias';
import { CadastrarCategoria } from './cadastrar/cadastrar-categoria';
import { ExcluirCategoria } from './excluir/excluir-categoria';
import { EditarCategoria } from './editar/editar-categoria';

export const categoriaRoutes: Routes = [
  { path: '', component: ListarCategorias },
  { path: 'cadastrar', component: CadastrarCategoria },
  { path: 'editar/:id', component: EditarCategoria },
  { path: 'excluir/:id', component: ExcluirCategoria },
];
