<template>
    <div class="modal" tabindex="-1" id="AddOrdersModal">
       <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
             <div class="modal-header">
               <h4>Realizar Pedido</h4>
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
                     <label class="form-label">Articulo</label>
                  </div>
                  <div class="col-8">
                     <select class="form-control" v-model="formClient.articulo_id">
                        <option :value="0">Seleccione</option>
                        <option v-for="(article, index) in articles" :key="index" :value="article.id">{{ article.nombre }} - {{ moneda(article.precio) }}</option>
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

               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Cantidad</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="number" v-model="formClient.amount" />
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
import * as Article from "@/store/modules/Articulos/enums/StoreEnums";
import { moneda } from '@/helpers/Moneda';
import { Modal } from 'bootstrap';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const formClient = ref({
  articulo_id: 0,
  client_id: 0,
  code: "",
  date: "",
  amount: 0,
});

const clients = computed(() => {
  return store.getters.getClients;
});

const articles = computed(() => {
  return store.getters.getArticles;
});

const saveOrder = async () => {
  await store.dispatch(Actions.SAVE_ORDER, {
    articulo_id: formClient.value.articulo_id,
    cliente_id: formClient.value.client_id,
    codigo: formClient.value.code,
    fecha: formClient.value.date,
    cantidad: formClient.value.amount,
  });

  await closeModalAddOrders();
  await loadOrders();
  clearForm();
};

const clearForm = () => {
   formClient.value.articulo_id = 0;
   formClient.value.client_id = 0;
   formClient.value.code = "";
   formClient.value.date = "";
   formClient.value.amount = 0;
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

const loadArticles = async () => {
   await store.dispatch(Article.Actions.GET_ALL_ARTICLE);
};

onMounted(async () => {
  await loadClients();
  await loadArticles();
});

</script>

<style scoped></style>
