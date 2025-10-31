export interface ListagemCategoriasApiResponse {
  registros: ListagemCategoriasModel[];
}

export interface ListagemCategoriasModel {
  id: string;
  titulo: string;
}

export interface CadastrarCategoriaModel {
  titulo: string;
}

export interface CadastrarCategoriaResponseModel {
  id: string;
}

export interface EditarCategoriaModel {
  titulo: string;
}

export interface EditarCategoriaResponseModel {
  titulo: string;
}

export interface DetalhesCategoriaModel {
  id: string;
  titulo: string;
}
