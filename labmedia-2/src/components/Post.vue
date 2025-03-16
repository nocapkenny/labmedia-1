<script setup lang="ts">
import { useApi } from "../composable/useApi";

const { data, error, isLoading, fetchData } = useApi("/posts/");

const sendData = () => {
  fetchData({
    method: "POST",
    data: { title: "Заголовок поста", body: "Содержимое поста", userId: 1 },
  });
};
</script>

<template>
  <div class="post">
    <p class="post__loading" v-if="isLoading">Отправка...</p>
    <p class="post__error" v-if="error" >{{ error }}</p>
    <p class="post__data" v-if="data">Ответ: {{ data }}</p>
    <button class="post__button button" @click="sendData" :disabled="isLoading">Отправить</button>
  </div>
</template>

<style scoped>
.post{
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.9);
  width: 500px;
  text-align: center;
}
.post__error {
  color: red;
}
</style>