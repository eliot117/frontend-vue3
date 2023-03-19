export interface Facturas {
  invoices: Invoices[]; 
}

export interface Invoices {
  id: number;
  codigo: string;
  pedido_id: number;
  fecha: string;
}
