<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-6">
        <h4>Lista de Articulos</h4>
      </div>
      <div class="col-6">
        <button
          type="button"
          class="btn btn-success"
          @click="openModal()"
        >
          Agregar
        </button>
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
                <th>Nombre</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(article, index) in articles" :key="index">
                <td>{{ article.id }}</td>
                <td>{{ article.codigo }}</td>
                <td>{{ article.nombre }}</td>
                <td>{{ moneda(article.precio) }}</td>
                <td>
                  <i class="bi bi-pencil-square" style="cursor: pointer;" @click="openModalEditArticle(article)"></i>
                  &nbsp;
                  <i class="bi bi-trash-fill" style="cursor: pointer;" @click="deleteArticle(article.id)"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <AgregarArticulo></AgregarArticulo>
  <EditarArticulo :id="id"></EditarArticulo>
</template>

<script setup lang="ts">
import { Actions } from '@/store/modules/Articulos/enums/StoreEnums';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import AgregarArticulo from "@/components/AgregarArticulo.vue";
import EditarArticulo from '@/components/EditarArticulo.vue';
import { Modal } from 'bootstrap';
import { moneda } from '@/helpers/Moneda';

const store = useStore();
const id = ref(0);

const articles = computed(() => {
  return store.getters.getArticles;
});

const loadArticles = async () => {
  await store.dispatch(Actions.GET_ALL_ARTICLE);
};

const openModal = () => {
  const articleModal = document.getElementById("AddArticleModal");
  if (articleModal) {
    new Modal(articleModal, {
      backdrop: "static",
      keyboard: false,
    }).show();
  }
}

const deleteArticle = async (id: number) => {
  await store.dispatch(Actions.DELETE_ARTICLE, {
    id: id,
  });

  await loadArticles();
}

const openModalEditArticle = async (article: { id: number; }) => {
   id.value = article.id;
   await store.dispatch(Actions.GET_ARTICLE, {
      id: article.id
   });
   const editArticleModal = document.getElementById("EditArticleModal");
   if (editArticleModal) {
     new Modal(editArticleModal, {
        backdrop: "static",
        keyboard: false,
     }).show();
   }
};

onMounted(async () => {
  await loadArticles();
});

</script>

<style scoped></style>
