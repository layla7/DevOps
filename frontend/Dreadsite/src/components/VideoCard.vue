<script setup>
const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
  watchlist : {
    type : Boolean,
    required : false
  },
run : {
    type : Function,
    required : true
  }
});
</script>

<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <RouterLink :to="'/video/' + video.video_id.S" class="video-card">
        <div class="p-2">
          <img :src="video.video_thumbnail.S" alt="Video Thumbnail" />
          <div class="h3 text-wrap">{{ video.video_title.S }}</div>
        </div>
      </RouterLink>
      <button class="plus-button" v-on:click="props.run(video.video_id.S)">
        <span>{{ watchlist ? "-" : "+" }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.plus-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px; /* Adjust as needed */
}

.plus-button:hover {
  background-color: grey;
  color: white; /* Optional: change the text color on hover */
}

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
