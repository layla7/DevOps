<script setup>
import VideoCard from "../components/VideoCard.vue";
import { useStore } from "@/store";

const store = useStore();

(async () => {
  let videos = await fetch(
    "http://52.91.3.179/videos"
  );
  if (videos.status === 200) {
    store.videos = await videos.json();
  };
})();

console.log(store.videos);
</script>

<template>
  <div>
    <h1>Hi!!!!!</h1>
    <div class="d-flex justify-content" style = " overflow: auto; white-space: nowrap;">
      <VideoCard v-for="video in store.videos" />
    </div>
  </div>
</template>
