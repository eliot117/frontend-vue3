<template>
    <div class="container">
       <div class="row mt-3">
          <div class="col-6">
            Lista de Clientes
          </div>
          <div class="col-6">
            <div class="row">
                <div class="col-12">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="openModalCliente()"
                  >
                    Agregar
                  </button>
               </div>
            </div>
          </div>
       </div>

       <div class="row mt-3">
          <div class="col-12">
            <div class="table-responsive">
               <table class="table table-bordered">
                  <thead>
                    <tr>
                       <th>Id</th> 
                       <th>Nombre</th> 
                       <th>Razon Social</th>
                       <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(client, index) in clients" :key="index">
                       <td>{{ client.id }}</td>
                       <td>{{ client.nombre }}</td>
                       <td>{{ client.razon_social }}</td>
                       <th>
                          <i class="bi bi-pencil-square" style="cursor: pointer;" @click="openModalEditCliente(client)"></i>
                          &nbsp;
                          <i class="bi bi-trash-fill" style="cursor: pointer;" @click="deleteClient(client.id)"></i>
                       </th>
                    </tr>
                  </tbody>
               </table>
            </div>
          </div>  
       </div>
    </div>
    <AgregarCliente></AgregarCliente>
    <EditarCliente :id="id"></EditarCliente>
</template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Actions } from '../store/modules/Clientes/enums/StoreEnums';
import { Modal } from "bootstrap";
import AgregarCliente from "@/components/AgregarCliente.vue";
import EditarCliente from "@/components/EditarCliente.vue";

const store = useStore();
const id = ref(0);

const clients = computed(() => {
    return store.getters.getClients;
});

const loadCliente = async () => {
  await store.dispatch(Actions.GET_ALL_CLIENTS);
};

const openModalCliente = () => {
   const addClient = document.getElementById("AddClientModal");
   if (addClient) {
     new Modal(addClient, {
        backdrop: "static",
        keyboard: false,
     }).show();
   }
};

const openModalEditCliente = async (client: { id: number; }) => {
   id.value = client.id;
   await store.dispatch(Actions.GET_CLIENT, {
      id: client.id
   });
   const editClient = document.getElementById("EditClientModal");
   if (editClient) {
     new Modal(editClient, {
        backdrop: "static",
        keyboard: false,
     }).show();
   }
};

const deleteClient = async (id: number) => {
  await store.dispatch(Actions.DELETE_CLIENT, {
    id: id,
  });

  await loadCliente();
}

onMounted(async () => {
  await loadCliente();
});
</script>
  
<style scoped></style>
