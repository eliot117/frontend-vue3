import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Facturas, Invoices } from './interfaces';
import { Mutations, Actions } from './enums/StoreEnums';
import Api from '@/helpers/Api';

@Module
export default class FactuasModule extends VuexModule implements Facturas {
   invoices = [] as Invoices[];

   @Mutation
   [Mutations.SET_INVOICES](data: Invoices[]) {
    this.invoices = data;
   }

   @Action
   async [Actions.GET_ALL_INVOICES]() {
    return await Api.get("facturas").then((response) => {
       this.context.commit(Mutations.SET_INVOICES, response.data);
    }).catch((error) => {
        console.log(error);
    });
   }

   get getInvoices(): Invoices[] {
    return this.invoices;
   }
}
