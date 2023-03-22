<template>
   <div class="container">
       <div class="row mt-3">
          <div class="col-6">
            Lista de Pedidos
          </div>
          <div class="col-6">
            <div class="row">
                <div class="col-12">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="openModalOrders()"
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
                       <th>Cliente</th> 
                       <th>Codigo</th>
                       <th>Fecha</th>
                       <th>Cantidad</th>
                       <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(order, index) in orders" :key="index">
                       <td>{{ order.id }}</td>
                       <td>{{ order.cliente.nombre }}</td>
                       <td>{{ order.codigo }}</td>
                       <td>{{ order.fecha }}</td>
                       <td v-if="order.pedidos_items !== undefined">
                        {{ order.pedidos_items[0].cantidad }}
                       </td>
                       <td v-else></td>
                       <th>
                          <i class="bi bi-pencil-square" style="cursor: pointer;" @click="openModalEditOrders(order)"></i>
                          &nbsp;
                          <i class="bi bi-trash-fill" style="cursor: pointer;"></i>
                       </th>
                    </tr>
                  </tbody>
               </table>
            </div>
          </div>  
       </div>
    </div>
   <AgregarPedido></AgregarPedido>
   <EditarPedido :id="id"></EditarPedido>
</template>

<script setup lang="ts">
import { Actions } from '@/store/modules/Pedidos/enums/StoreEnums';
import { Modal } from 'bootstrap';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import AgregarPedido from '@/components/AgregarPedido.vue';
import EditarPedido from '@/components/EditarPedido.vue';

const store = useStore();
const id = ref(0);

const orders = computed(() => {
  return store.getters.getOrders;
});

const loadOrders = async () => {
  await store.dispatch(Actions.GET_ALL_ORDERS);
};

const openModalOrders = () => {
   const orderModal = document.getElementById("AddOrdersModal");
   if (orderModal) {
      new Modal(orderModal, {
         backdrop: "static", 
         keyboard: false,
      }).show();
   }
};

const openModalEditOrders = async (order: { id: number; }) => {
   id.value = order.id;
   await store.dispatch(Actions.GET_ORDER, {
      id: order.id,
   });
   
   const orderModal = document.getElementById("EditOrdersModal");
   if (orderModal) {
      new Modal(orderModal, {
         backdrop: "static", 
         keyboard: false,
      }).show();
   }
};

onMounted(async() => {
   await loadOrders();
});

</script>

<style scoped></style>
