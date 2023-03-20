<template>
    <div class="modal" tabindex="-1" id="EditOrdersModal">
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
                      <button type="button" class="btn btn-success" @click="updateOrder()">
                         Guardar
                      </button>
                  </div>  
                  <div class="col-6">
                      <button type="button" class="btn btn-danger" @click="closeModalEditOrders()">
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
import { ref, onMounted, computed, watch, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  id: Number,
});

const formClient = ref({
  client_id: 0,
  code: "",
  date: "",
});

const setOrder = computed(() => {
  return store.getters.getPedido;
});

const clients = computed(() => {
  return store.getters.getClients;
});

const updateOrder = async () => {
  await store.dispatch(Actions.UPDATE_ORDER, {
    id: props.id,
    cliente_id: formClient.value.client_id,
    codigo: formClient.value.code,
    fecha: formClient.value.date,
  });

  await closeModalEditOrders();
  await loadOrders();
};

const closeModalEditOrders = () => {
  const orderEdit = document.getElementById("EditOrdersModal");
  if (orderEdit) {
    return Modal.getInstance(orderEdit)?.hide();
  }
};

const findOrder = () => {
  formClient.value.client_id = setOrder.value.cliente_id;
  formClient.value.code = setOrder.value.codigo;
  formClient.value.date = setOrder.value.fecha;
}

watch(setOrder, () => {
  if (Object.entries(setOrder.value).length !== 0) {
    findOrder();      
  }
});

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
