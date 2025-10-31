export interface ListagemNotasApiResponse {
  registros: ListagemNotasModel[];
}

export interface ListagemNotasModel {
  id: string;
  titulo: string;
  conteudo: string;
  categoria: string;
}

export interface CadastrarNotaModel {
  titulo: string;
  conteudo: string;
  categoriaId: string;
}

export interface CadastrarNotaResponseModel {
  id: string;
}

export interface EditarNotaModel {
  titulo: string;
  conteudo: string;
  categoriaId: string;
}

export interface EditarNotaResponseModel {
  titulo: string;
  conteudo: string;
  categoria: string;
}

export interface DetalhesNotaModel {
  id: string;
  titulo: string;
  conteudo: string;
  categoria: CategoriaNotaModel;
}

export interface CategoriaNotaModel {
  id: string;
  titulo: string;
}
