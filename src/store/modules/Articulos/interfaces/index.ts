export interface Articulos {
  articles: Articles[];
  article: Article;
}

export interface Articles {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
}

export interface Article {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
}

export interface ParamsArticle {
  codigo: string;
  nombre: string;
  precio: number;
}

export interface ParamsUpdateArticle {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
}
