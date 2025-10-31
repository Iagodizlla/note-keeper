export interface ListagemCategoriasApiResponse {
  registros: ListagemCategoriasModel[];
}

export interface ListagemCategoriasModel {
  id: string;
  titulo: string;
}