import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
    CadastrarNotaModel, CadastrarNotaResponseModel, DetalhesNotaModel, EditarNotaModel,
    EditarNotaResponseModel, ListagemNotasApiResponse, ListagemNotasModel
} from './nota.models';

@Injectable()
export class NotaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/notas';

  public cadastrar(notaModel: CadastrarNotaModel): Observable<CadastrarNotaResponseModel> {
    return this.http.post<CadastrarNotaResponseModel>(this.apiUrl, notaModel);
  }

  public editar(id: string, notaModel: EditarNotaModel): Observable<EditarNotaResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<EditarNotaResponseModel>(urlCompleto, notaModel);
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesNotaModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesNotaModel>(urlCompleto);
  }

  public selecionarTodas(): Observable<ListagemNotasModel[]> {
    return this.http.get<ListagemNotasApiResponse>(this.apiUrl).pipe(map((res) => res.registros));
  }
}
