<script setup>
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useStore();
store.video = null;

if(!store.userDetails.auth){
  router.push("/login");
}

(async () => {
  let video = await fetch(
    "http://52.91.3.179/video?id=" + route.params.id
  ); store.video = await video.json();
})();

console.log(store.video);

</script>


<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="ratio ratio-16x9 mb-4">
                    <video controls>
                        <source :src="store.video.video_url.S" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <h2 class="mb-3">{{ store.video.video_title.S }}</h2>
                <p class="text-muted">{{ store.video.video_description.S }}</p>
            </div>
        </div>
    </div>
</template>