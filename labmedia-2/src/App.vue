<script setup>
import Get from "./components/Get.vue";
import Post from "./components/Post.vue";
</script>

<template>
  <div class="wrapper">
    <Get />
    <Post />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
