import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import { Orders, Pedidos } from './interfaces';
import { Mutations, Actions } from './enums/StoreEnums';
import Api from '@/helpers/Api';

@Module
export default class PedidosModule extends VuexModule implements Pedidos {
   orders = [] as Orders[];

   @Mutation
   [Mutations.SET_ORDERS](data: Orders[]) {
    this.orders = data;
   }

   @Action
   async [Actions.GET_ALL_ORDERS]() {
    return await Api.get("pedidos").then((response) => {
       this.context.commit(Mutations.SET_ORDERS, response.data);
    }).catch((error) => {
        console.log(error);
    });
   }

   get getOrders(): Orders[] {
    return this.orders;
   }
}