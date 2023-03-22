export interface Pedidos {
  orders: Orders[];
  order: Orders;
}

export interface Orders {
  id: number;
  cliente_id: number;
  codigo: string;
  fecha: string;
}

export interface Order {
  id: number;
  cliente_id: number;
  codigo: string;
  fecha: string;
}

export interface ParamsOrders {
  articulo_id: number;
  cliente_id: number;
  codigo: string;
  fecha: string;
  cantidad: number;
}

export interface ParamsUpdateOrders {
  id: number;
  cliente_id: number;
  codigo: string;
  fecha: string;
}
