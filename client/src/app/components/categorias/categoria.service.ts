import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
    CadastrarCategoriaModel, CadastrarCategoriaResponseModel, DetalhesCategoriaModel,
    EditarCategoriaModel, EditarCategoriaResponseModel, ListagemCategoriasApiResponse,
    ListagemCategoriasModel,
} from './categoria.models';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/categorias';

  public cadastrar(
    categoriaModel: CadastrarCategoriaModel,
  ): Observable<CadastrarCategoriaResponseModel> {
    return this.http.post<CadastrarCategoriaResponseModel>(this.apiUrl, categoriaModel);
  }

   public editar(
    id: string,
    editarCategoriaModel: EditarCategoriaModel,
  ): Observable<EditarCategoriaResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<EditarCategoriaResponseModel>(urlCompleto, editarCategoriaModel);
  }

  public selecionarPorId(id: string): Observable<DetalhesCategoriaModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesCategoriaModel>(urlCompleto);
  }

  public selecionarTodas(): Observable<ListagemCategoriasModel[]> {
    return this.http
      .get<ListagemCategoriasApiResponse>(this.apiUrl)
      .pipe(map((res) => res.registros));
  }
}
