<template>
    <div class="modal" tabindex="-1" id="AddOrdersModal">
       <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
             <div class="modal-header">
               <h4>Agregar Cliente</h4>
               <button
                 type="button"
                 class="btn-close"
                 data-bs-dismiss="modal"
                 aria-label="Close"
               ></button>
             </div>
             <div class="modal-body">
               <div class="row">
                  <div class="col-4">
                     <label class="form-label">Cliente</label>
                  </div>
                  <div class="col-8">
                     <select class="form-control" v-model="formClient.client_id">
                        <option :value="0">Seleccione</option>
                        <option v-for="(client, index) in clients" :key="index" :value="client.id"> {{ client.nombre }}</option>
                     </select>
                  </div>
               </div>
  
               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Codigo</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="text" v-model="formClient.code" />
                  </div>
               </div>

               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Fecha</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="date" v-model="formClient.date" />
                  </div>
               </div>
             </div>
             <div class="modal-footer">
                 <div class="row">
                    <div class="col-6">
                      <button type="button" class="btn btn-success" @click="saveOrder()">
                         Guardar
                      </button>
                  </div>  
                  <div class="col-6">
                      <button type="button" class="btn btn-danger" @click="closeModalAddOrders()">
                         Cancelar
                      </button>
                    </div>
                 </div>
             </div>
          </div>
       </div>
    </div>
</template>

<script setup lang="ts">
import { Actions } from '@/store/modules/Pedidos/enums/StoreEnums';
import * as Client from "@/store/modules/Clientes/enums/StoreEnums";
import { Modal } from 'bootstrap';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const formClient = ref({
  client_id: 0,
  code: "",
  date: "",
});

const clients = computed(() => {
  return store.getters.getClients;
});

const saveOrder = async () => {
  await store.dispatch(Actions.SAVE_ORDER, {
    cliente_id: formClient.value.client_id,
    codigo: formClient.value.code,
    fecha: formClient.value.date,
  });

  await closeModalAddOrders();
  await loadOrders();
  clearForm();
};

const clearForm = () => {
   formClient.value.client_id = 0;
   formClient.value.code = "";
   formClient.value.date = "";
};

const closeModalAddOrders = () => {
  const modalOrders = document.getElementById("AddOrdersModal");
  if (modalOrders) {
    return Modal.getInstance(modalOrders)?.hide();
  }   
};

const loadClients = async() => {
  await store.dispatch(Client.Actions.GET_ALL_CLIENTS);
};

const loadOrders = async () => {
  await store.dispatch(Actions.GET_ALL_ORDERS);
};

onMounted(async () => {
  await loadClients();  
});

</script>

<style scoped></style>
