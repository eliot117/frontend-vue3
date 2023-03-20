<template>
   <div class="modal" tabindex="-1" id="AddArticleModal">
     <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
           <div class="modal-header">
             <h4>Agregar Articulo</h4>
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
                   <input class="form-control" type="text" v-model="formClient.code" />
                </div>
             </div>

             <div class="row mt-3">
                <div class="col-4">
                   <label class="form-label">Nombre</label>
                </div>
                <div class="col-8">
                   <input class="form-control" type="text" v-model="formClient.name" />
                </div>
             </div>

             <div class="row mt-3">
                <div class="col-4">
                   <label class="form-label">Precio</label>
                </div>
                <div class="col-8">
                   <input class="form-control" type="number" v-model="formClient.price" />
                </div>
             </div>
           </div>
           <div class="modal-footer">
               <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-success" @click="saveArticle()">
                       Guardar
                    </button>
                </div>  
                <div class="col-6">
                    <button type="button" class="btn btn-danger" @click="closeModalArticle()">
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
import { Actions } from '@/store/modules/Articulos/enums/StoreEnums';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const formClient = ref({
  code: "",
  name: "",
  price: 0,
});

const loadArticles = async () => {
  await store.dispatch(Actions.GET_ALL_ARTICLE);
};

const saveArticle = async () => {
  await store.dispatch(Actions.SAVE_ARTICLE, {
    codigo: formClient.value.code,
    nombre: formClient.value.name,
    precio: formClient.value.price,
  });

  await closeModalArticle();
  await loadArticles();
};

const closeModalArticle = () => {
  const article = document.getElementById("AddArticleModal");
  if (article) {
    return Modal.getInstance(article)?.hide();
  }
};

</script>

<style scoped></style>
