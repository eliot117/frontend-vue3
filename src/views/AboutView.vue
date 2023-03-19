<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import Api from "@/helpers/Api";
import { onMounted, ref } from "vue";

const clientes = ref([]);

const loadCliente = async () => {
  return await Api.get("clientes").then((response) => {
    clientes.value = response.data;
  }).catch((error) => {
    console.log(error)
  });
};

onMounted(async () => {
  await loadCliente();
});

</script>

<style scoped></style>
