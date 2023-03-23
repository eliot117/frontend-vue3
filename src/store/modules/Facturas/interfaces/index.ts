export interface Facturas {
  invoices: Invoices[];
  invoice: Invoice;
}

export interface Invoices {
  id: number;
  codigo: string;
  pedido_id: number;
  fecha: string;
}

export interface Invoice {
  id: number;
  codigo: string;
  pedido_id: number;
  fecha: string;
}

export interface ParamsInvoices {
  codigo: string;
  pedido_id: number;
  fecha: string;
}

export interface ParamsUpdateInvoices {
  id: number;
  codigo: string;
  pedido_id: number;
  fecha: string;
}