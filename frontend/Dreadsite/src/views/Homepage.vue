<script setup>
import VideoCard from "../components/VideoCard.vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

if(!store.userDetails.auth){
  router.push("/login");
}

(async () => {
  let videos = await fetch(
    "http://52.91.3.179/videos"
  );
  if (videos.status === 200) {
    store.videos = await videos.json();
  };
})();
</script>

<template>
  <div>
    <h1>Hi!!!!!</h1>
    <div class="d-flex justify-content" style = " overflow: auto; white-space: nowrap;">
      <div v-bind:key="video" v-for="video in store.videos">
        <VideoCard :video = "video"/>
      </div>
    </div>
  </div>
</template>
