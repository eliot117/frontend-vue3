export interface Articulos {
  articles: Articles[];
}

export interface Articles {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;   
}
