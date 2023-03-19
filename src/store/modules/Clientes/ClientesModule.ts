import { Action, Module, Mutation, VuexModule  } from "vuex-module-decorators";
import { Clientes, Clients, ParamsClient } from "./interfaces";
import { Mutations, Actions } from './enums/StoreEnums';
import Api from '@/helpers/Api';
import Swal from "sweetalert2";

@Module
export default class ClientesModule extends VuexModule implements Clientes {
   clients = [] as Clients[];

   @Mutation
   [Mutations.SET_CLIENTS](data: Clients[]) {
    this.clients = data;
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

   get getClients(): Clients[] {
    return this.clients;
   }
}