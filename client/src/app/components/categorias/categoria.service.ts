import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ListagemCategoriasApiResponse, ListagemCategoriasModel } from './categoria.models';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/categorias';

  public selecionarTodas(): Observable<ListagemCategoriasModel[]> {
    return this.http
      .get<ListagemCategoriasApiResponse>(this.apiUrl)
      .pipe(map((res) => res.registros));
  }
}