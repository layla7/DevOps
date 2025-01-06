<script setup>
import VideoCard from "../components/VideoCard.vue";
</script>

<template>
  <div>
    <h1>Hi!!!!!</h1>
    <div class="d-flex justify-content" style = " overflow: auto; white-space: nowrap;">
      <VideoCard v-for="n in 10" />
    </div>
  </div>
</template>
