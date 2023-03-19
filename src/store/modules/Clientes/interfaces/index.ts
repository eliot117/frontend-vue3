export interface Clientes {
  clients: Clients[];
  client: Client;
}

export interface Clients {
  id: number;
  nombre: string;
  razon_social: string;
}

export interface Client {
  id: number;
  nombre: string;
  razon_social: string;
}

export interface ParamsClient {
  nombre: string;
  razon_social: string;
}