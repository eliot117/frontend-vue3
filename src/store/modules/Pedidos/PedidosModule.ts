import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import { Order, Orders, Pedidos, ParamsUpdateOrders, ParamsOrders } from './interfaces';
import { Mutations, Actions } from './enums/StoreEnums';
import Api from '@/helpers/Api';
import Swal from 'sweetalert2';

@Module
export default class PedidosModule extends VuexModule implements Pedidos {
   orders = [] as Orders[];
   order = {} as Order;

   @Mutation
   [Mutations.SET_ORDERS](data: Orders[]) {
     this.orders = data;
   }

   @Mutation
   [Mutations.SET_ORDER](data: Order) {
     this.order = data;
   }

   @Action
   async [Actions.GET_ALL_ORDERS]() {
    return await Api.get("pedidos").then((response) => {
       this.context.commit(Mutations.SET_ORDERS, response.data);
    }).catch((error) => {
        console.log(error);
    });
   }

   @Action
   async [Actions.SAVE_ORDER](params: ParamsOrders) {
    return await Api.post("pedidos", params).then((response) => {
      Swal.fire({
        title: "El pedido se ha guardado correctamente.",
        icon: "success",
      });
    }).catch((error) => {
        console.log(error);
    });
   }

   @Action
   async [Actions.GET_ORDER](params: { id: number; }) {
    return await Api.get(`pedidos/${params.id}`).then((response) => {
       this.context.commit(Mutations.SET_ORDER, response.data);
    }).catch((error) => {
        console.log(error);
    });
   }

   @Action
   async [Actions.UPDATE_ORDER](params: ParamsUpdateOrders) {
    return await Api.put(`pedidos/${params.id}`, params).then((response) => {
      Swal.fire({
        title: "El pedido se ha actualizado correctamente",
        icon: "success",
      });
    }).catch((error) => {
        console.log(error);
    });
   }

   @Action
   async [Actions.DELETE_ORDER](params: { id: number; }) {
    return await Api.put(`pedidos/${params.id}`).then((response) => {
      Swal.fire({
        title: "El pedido se ha eliminado correctamente",
        icon: "success",
      });
    }).catch((error) => {
        console.log(error);
    });
   }

   get getOrders(): Orders[] {
     return this.orders;
   }

   get getPedido(): Order {
     return this.order;
   }
}