<template>
    <div class="modal" tabindex="-1" id="EditArticleModal">
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
                     <button type="button" class="btn btn-success" @click="updateArticle()">
                        Actualizar
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
import { ref, defineProps, computed, watch } from 'vue';
import { useStore } from 'vuex';
 
const store = useStore();

const props = defineProps({
  id: Number,
});

const formClient = ref({
  code: "",
  name: "",
  price: 0,
});

const setArticle = computed(() => {
  return store.getters.getArticulos;
});

const loadArticles = async () => {
  await store.dispatch(Actions.GET_ALL_ARTICLE);
};

const updateArticle = async () => {
  await store.dispatch(Actions.UPDATE_ARTICLE, {
    id: props.id,
    codigo: formClient.value.code,
    nombre: formClient.value.name,
    precio: formClient.value.price,
  });

  await closeModalArticle();
  await loadArticles();
};

const closeModalArticle = () => {
  const article = document.getElementById("EditArticleModal");
  if (article) {
    return Modal.getInstance(article)?.hide();
  }
};

const setArticleData = () => {
  formClient.value.code = setArticle.value.codigo;
  formClient.value.name = setArticle.value.nombre;
  formClient.value.price = setArticle.value.precio;
};

watch(setArticle, () => {
  if (Object.entries(setArticle.value).length !== 0) {
    setArticleData();
  }
});

</script>

<style scoped></style>
 