<script setup lang="ts">
import { useApi } from "../composable/useApi";

const { data, error, isLoading, fetchData } = useApi<{
  id: number;
  title: string;
  body: string;
}>("/posts/80");

fetchData();
</script>

<template>
  <div class="get">
    <p class="get__loading" v-if="isLoading">Загрузка...</p>
    <p class="get__error" v-if="error" >{{ error }}</p>
    <div class="get__data" v-if="data && !isLoading">
      <h3>ID: {{ data.id }}</h3>
      <h2>Заголовок: {{ data.title }}</h2>
      <p>Содержимое: {{ data.body }}</p>
    </div>
    <button class="get__button button" @click="() => fetchData()" :disabled="isLoading">Перезапросить</button>
  </div>
</template>

<style scoped>
.get{
  margin-bottom: 50px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.9);
  width: 500px;
  text-align: center;
}
.get__loading{
  margin-bottom: 10px;
  font-size: 18px;
}
.get__data h3{
  margin-bottom: 5px;
  font-size: 18px;
}
.get__data h2{
  margin-bottom: 5px;
  font-size: 18px;
}
.get__error {
  color: red;
}
</style>
