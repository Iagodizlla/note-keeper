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