<template>
    <div class="container">
       <div class="row mt-3">
          <div class="col-6">
            Lista de Facturas
          </div>
          <div class="col-6">
            <div class="row">
                <div class="col-12">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="openModalInvoices()"
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
                       <th>Codigo</th> 
                       <th>Pedido</th>
                       <th>Fecha</th>
                       <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(invoice, index) in invoices" :key="index">
                       <td>{{ invoice.id }}</td>
                       <td>{{ invoice.codigo }}</td>
                       <td>{{ invoice.pedido_id }}</td>
                       <td>{{ invoice.fecha }}</td>
                       <th>
                          <i class="bi bi-pencil-square" style="cursor: pointer;" @click="openModalEditInvoices(invoice)"></i>
                          &nbsp;
                          <i class="bi bi-trash-fill" style="cursor: pointer;" @click="deleteInvoices(invoice.id)"></i>
                       </th>
                    </tr>
                  </tbody>
               </table>
            </div>
          </div>  
       </div>
    </div>
    <AgregarFactura></AgregarFactura>
    <EditarFactura></EditarFactura>
</template>

<script setup lang="ts">
import AgregarFactura from '@/components/AgregarFactura.vue';
import EditarFactura from '@/components/EditarFactura.vue';
import { Actions } from '@/store/modules/Facturas/enums/StoreEnums';
import { Invoices } from '@/store/modules/Facturas/interfaces';
import { Modal } from 'bootstrap';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const id = ref(0);

const invoices = computed<Invoices[]>(() => {
   return store.getters.getInvoices;
});

const loadInvoices = async () => {
  await store.dispatch(Actions.GET_ALL_INVOICES);
};

const openModalInvoices = () => {
  const modalInvoice = document.getElementById("AddInvoicesModal");
  if (modalInvoice) {
    new Modal(modalInvoice, {
      backdrop: "static",
      keyboard: false,
    }).show();
  }
};

const openModalEditInvoices = async (invoice: { id: number; }) => {
  id.value = invoice.id; 
  await store.dispatch(Actions.GET_INVOICE, {
    id: invoice.id,
  });
  const modalEditInvoice = document.getElementById("EditInvoicesModal");
  if (modalEditInvoice) {
    new Modal(modalEditInvoice, {
      backdrop: "static", 
      keyboard: false,
    }).show();
  }
};

const deleteInvoices = async (id: number) => {
 await store.dispatch(Actions.DELETE_INVOICE, {
    id: id,
 });
};

onMounted(async () => {
  await loadInvoices();
});

</script>

<style scoped></style>
