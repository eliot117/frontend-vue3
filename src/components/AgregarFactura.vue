<template>
    <div class="modal" tabindex="-1" id="AddInvoicesModal">
       <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
             <div class="modal-header">
               <h4>Generar factura</h4>
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
                     <select class="form-control" v-model="formInvoice.client_id">
                        <option :value="0">Seleccione</option>
                        <option v-for="(client, index) in clients" :value="client.id" :key="index">
                           {{ client.nombre }}
                        </option>
                     </select>
                  </div>
               </div>

               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Articulo</label>
                  </div>
                  <div class="col-8">
                     <select class="form-control" v-model="formInvoice.article_id">
                        <option :value="0">Seleccione</option>
                        <option v-for="(article, index) in articles" :value="article.id" :key="index">
                           {{ article.nombre }}
                        </option>
                     </select>
                  </div>
               </div>
  
               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Codigo</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="text" v-model="formInvoice.code" />
                  </div>
               </div>

               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Cantidad</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="number" v-model="formInvoice.amount" />
                  </div>
               </div>

               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Fecha</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="date" v-model="formInvoice.date" />
                  </div>
               </div>

             </div>
             <div class="modal-footer">
                 <div class="row">
                    <div class="col-6">
                      <button type="button" class="btn btn-success">
                         Guardar
                      </button>
                  </div>  
                  <div class="col-6">
                      <button type="button" class="btn btn-danger" @click="closeModalInvoices()">
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
import { Modal } from 'bootstrap';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import * as Orders from "@/store/modules/Pedidos/enums/StoreEnums";
import * as Articles from "@/store/modules/Articulos/enums/StoreEnums";
import * as Clients from "@/store/modules/Clientes/enums/StoreEnums";

const store = useStore();

const formInvoice = ref({
   client_id: 0,
   code: 0,
   pedido_id: 0,
   date: "",
   article_id: 0,
   amount: 0,
});

const orders = computed(() => {
  return store.getters.getOrders;
});

const articles = computed(() => {
  return store.getters.getArticles;
});

const clients = computed(() => {
  return store.getters.getClients;
});

const closeModalInvoices = () => {
  const addModalInoice = document.getElementById("AddInvoicesModal");
  if (addModalInoice) {
    return Modal.getInstance(addModalInoice)?.hide();
  }
};

const loadPedidos = async () => {
  await store.dispatch(Orders.Actions.GET_ALL_ORDERS);
};

const loadArticles = async () => {
 await store.dispatch(Articles.Actions.GET_ALL_ARTICLE);
};

const loadClients = async () => {
 await store.dispatch(Clients.Actions.GET_ALL_CLIENTS);
};

onMounted(async() => {
  await loadPedidos();
  await loadArticles();
  await loadClients();
});

</script>

<style scoped></style>
