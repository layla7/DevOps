<script setup>
import { useStore } from "@/store";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useStore();
let video = store.videos[route.params.id];
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="ratio ratio-16x9 mb-4">
                    <video controls>
                        <source src="https://d3ocjjcdyw5d62.cloudfront.net/Spectrum.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <h2 class="mb-3">{{ video.video_title }}</h2>
                <p class="text-muted">This is the description of the video. Here you can provide additional details about the content, context, or any other relevant information for the viewers.</p>
            </div>
        </div>
    </div>
</template>