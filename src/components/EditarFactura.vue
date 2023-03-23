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
                     <label class="form-label">Codigo</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="text" v-model="formInvoice.code" />
                  </div>
               </div>
  
               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Pedido</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="text" v-model="formInvoice.pedido_id" />
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

               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Articulo</label>
                  </div>
                  <div class="col-8">
                    <select class="form-control" v-model="formInvoice.article_id">
                       <option :value="0">Seleccione</option>
                    </select>
                  </div>
               </div>

               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Precio</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="number" disabled />
                  </div>
               </div>

               <div class="row mt-3">
                  <div class="col-4">
                     <label class="form-label">Cantidad</label>
                  </div>
                  <div class="col-8">
                     <input class="form-control" type="date" v-model="formInvoice.amount" />
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
                      <button type="button" class="btn btn-danger">
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
import { ref } from 'vue';

const formInvoice = ref({
   code: 0,
   pedido_id: 0,
   date: "",
   article_id: 0,
   amount: 0,
});

const closeModalInvoices = () => {
  const addModalInoice = document.getElementById("AddInvoicesModal");
  if (addModalInoice) {
    return Modal.getInstance(addModalInoice)?.hide();
  }
};

</script>

<style scoped></style>
