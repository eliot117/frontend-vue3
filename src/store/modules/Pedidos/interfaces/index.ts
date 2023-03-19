export interface Pedidos {
  orders: Orders[]; 
}

export interface Orders {
  id: number;
  cliente_id: number;
  codigo: string;
  fecha: string;
}