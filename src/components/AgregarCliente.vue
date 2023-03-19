<template>
  <div class="modal" tabindex="-1" id="AddClientModal">
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
                   <label class="form-label">Nombre</label>
                </div>
                <div class="col-8">
                   <input class="form-control" type="text" v-model="formClient.name" />
                </div>
             </div>

             <div class="row mt-3">
                <div class="col-4">
                   <label class="form-label">Razon social</label>
                </div>
                <div class="col-8">
                   <input class="form-control" type="text" v-model="formClient.social_reason" />
                </div>
             </div>
           </div>
           <div class="modal-footer">
               <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-success" @click="saveClient()">
                       Guardar
                    </button>
                </div>  
                <div class="col-6">
                    <button type="button" class="btn btn-danger" @click="closeModalAddClient()">
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
import { useStore } from 'vuex';
import { Actions } from '../store/modules/Clientes/enums/StoreEnums';

const store = useStore();

const formClient = ref({
  name: "",
  social_reason: "",
});

const saveClient = async() => {
  await store.dispatch(Actions.SAVE_CLIENT, {
    nombre: formClient.value.name,
    razon_social: formClient.value.social_reason,
  });

  await closeModalAddClient();
  await clearForm();
};

const clearForm = () => {
  formClient.value.name = "";
  formClient.value.social_reason = "";
};

const closeModalAddClient = () => {
  const modalClient = document.getElementById("AddClientModal");
  if (modalClient) {
    return Modal.getInstance(modalClient)?.hide();
  }
};

</script>

<style scoped></style>
