<script setup>
const props = defineProps({
  video: {
    type: Object,
    required: true,
  }
});

</script>

<template>
<div class="container mt-5">
    <div class="d-flex justify-content-center">
        <RouterLink to="/video" class="video-card">
            <div class = "p-2">
                <img :src="video.video_thumbnail.S" alt="Video Thumbnail">
                <div class="h3 text-wrap">{{video.video_title.S}}</div>
            </div>
        </RouterLink>
    </div>
</div>
</template>

<style scoped>
.video-card {
    width: 100%;
    border-radius: 8px;
    max-width: 320px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;
}
.video-card img {
    border-radius: 8px;
    width: 100%;
}

.video-card:hover {
    background-color: #f4f4f4;
}
</style>
