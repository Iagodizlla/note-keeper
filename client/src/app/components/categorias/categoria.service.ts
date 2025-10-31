import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { obterOpcoesHeaderAutorizacao } from '../../util/obter-opcoes-header-autorizacao';
import { AuthService } from '../auth/auth.service';
import {
    CadastrarCategoriaModel, CadastrarCategoriaResponseModel, DetalhesCategoriaModel,
    EditarCategoriaModel, EditarCategoriaResponseModel, ListagemCategoriasApiResponse,
    ListagemCategoriasModel,
} from './categoria.models';

@Injectable()
export class CategoriaService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly apiUrl = environment.apiUrl + '/categorias';

  public cadastrar(
    categoriaModel: CadastrarCategoriaModel,
  ): Observable<CadastrarCategoriaResponseModel> {
    return this.http.post<CadastrarCategoriaResponseModel>(
      this.apiUrl,
      categoriaModel,
      obterOpcoesHeaderAutorizacao(this.authService.accessTokenSubject$.getValue()),
    );
  }

   public editar(
    id: string,
    editarCategoriaModel: EditarCategoriaModel,
  ): Observable<EditarCategoriaResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<EditarCategoriaResponseModel>(
      urlCompleto,
      editarCategoriaModel,
      obterOpcoesHeaderAutorizacao(this.authService.accessTokenSubject$.getValue()),
    );
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(
      urlCompleto,
      obterOpcoesHeaderAutorizacao(this.authService.accessTokenSubject$.getValue()),
    );
  }

  public selecionarPorId(id: string): Observable<DetalhesCategoriaModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesCategoriaModel>(
      urlCompleto,
      obterOpcoesHeaderAutorizacao(this.authService.accessTokenSubject$.getValue()),
    );
  }

  public selecionarTodas(): Observable<ListagemCategoriasModel[]> {
    return this.http
      .get<ListagemCategoriasApiResponse>(
        this.apiUrl,
        obterOpcoesHeaderAutorizacao(this.authService.accessTokenSubject$.getValue()),
      )
      .pipe(map((res) => res.registros));
  }
}
