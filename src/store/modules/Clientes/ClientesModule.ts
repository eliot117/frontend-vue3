import { Action, Module, Mutation, VuexModule  } from "vuex-module-decorators";
import { Client, Clientes, Clients, ParamsClient } from "./interfaces";
import { Mutations, Actions } from './enums/StoreEnums';
import Api from '@/helpers/Api';
import Swal from "sweetalert2";

@Module
export default class ClientesModule extends VuexModule implements Clientes {
   clients = [] as Clients[];
   client = {} as Client;

   @Mutation
   [Mutations.SET_CLIENTS](data: Clients[]) {
    this.clients = data;
   }

   @Mutation
   [Mutations.SET_CLIENT](data: Client) {
    this.client = data;
   }

   @Action
   async [Actions.GET_ALL_CLIENTS]() {
    return await Api.get("clientes").then((response) => {
      this.context.commit(Mutations.SET_CLIENTS, response.data);
    }).catch((error) => {
        console.log(error);
    });
   }

   @Action
   async [Actions.SAVE_CLIENT](params: ParamsClient) {
    return await Api.post("clientes", params).then((response) => {
      console.log(response.data);
      Swal.fire({
        title: "El cliente se ha guardado correctamente",
        icon: "success",
      });
    }).catch((error) => {
      console.log(error);
    });
   }

   @Action
   async [Actions.GET_CLIENT](params: { id: number; }) {
    return await Api.get(`clientes/${params.id}`).then((response) => {
      this.context.commit(Mutations.SET_CLIENT, response.data);      
    }).catch((error) => {
      console.log(error);
    });
   }

   @Action
   async [Actions.UPDATE_CLIENT](params: { id: number; nombre: string; razon_social: string; }) {
    return await Api.put(`clientes/${params.id}`, params).then((response) => {
      Swal.fire({
        title: "El cliente se ha actualizado correctamente",
        icon: "success",
      });
    }).catch((error) => {
      console.log(error);
    });
   }

   @Action
   async [Actions.DELETE_CLIENT](params: { id: number;}) {
    return await Api.delete(`clientes/${params.id}`).then((response) => {
      Swal.fire({
        title: "El cliente se ha eliminado",
        icon: "success",
      });
    }).catch((error) => {
      console.log(error);
    });
   }

   get getClients(): Clients[] {
    return this.clients;
   }

   get getCliente(): Client {
    return this.client;
   }
}