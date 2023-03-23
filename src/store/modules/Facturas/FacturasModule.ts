import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Facturas, Invoice, Invoices, ParamsInvoices, ParamsUpdateInvoices } from './interfaces';
import { Mutations, Actions } from './enums/StoreEnums';
import Api from '@/helpers/Api';
import Swal from 'sweetalert2';

@Module
export default class FactuasModule extends VuexModule implements Facturas {
   invoices = [] as Invoices[];
   invoice = {} as Invoice;

   @Mutation
   [Mutations.SET_INVOICES](data: Invoices[]) {
    this.invoices = data;
   }

   @Mutation
   [Mutations.SET_INVOICE](data: Invoice) {
      this.invoice = data;
   }

   @Action
   async [Actions.GET_ALL_INVOICES]() {
    return await Api.get("facturas").then((response) => {
       this.context.commit(Mutations.SET_INVOICES, response.data);
    }).catch((error) => {
        console.log(error);
    });
   }

   @Action
   async [Actions.SAVE_INVOICE](params: ParamsInvoices) {
    return await Api.post("facturas", params).then((response) => {
      Swal.fire({
         title: "La factura se ha guardado correctamente",
         icon: "success",
      });
    }).catch((error) => {
        console.log(error);
    });
   }

   @Action
   async [Actions.GET_INVOICE](params: { id: number; }) {
    return await Api.get(`facturas/${params.id}`).then((response) => {
       this.context.commit(Mutations.SET_INVOICE, response.data);
    }).catch((error) => {
        console.log(error);
    });
   }

   @Action
   async [Actions.UPDATE_INVOICE](params: ParamsUpdateInvoices) {
    return await Api.put(`facturas/${params.id}`, params).then((response) => {
      Swal.fire({
         title: "La factura se ha actualizado correctamente",
         icon: "success",
      });
    }).catch((error) => {
        console.log(error);
    });
   }

   @Action
   async [Actions.DELETE_INVOICE](params: { id: number; }) {
    return await Api.delete(`facturas/${params.id}`).then((response) => {
      Swal.fire({
         title: "La factura se ha elminado correctamente",
         icon: "success",
      });
    }).catch((error) => {
        console.log(error);
    });
   }

   get getInvoices(): Invoices[] {
     return this.invoices;
   }

   get getFactura(): Invoice {
     return this.invoice;
   }
}
