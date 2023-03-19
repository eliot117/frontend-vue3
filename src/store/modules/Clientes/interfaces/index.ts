export interface Clientes {
  clients: Clients[];  
}

export interface Clients {
  id: number;
  nombre: string;
  razon_social: string;
}

export interface ParamsClient {
  nombre: string;
  razon_social: string;
}