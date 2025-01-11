<script setup>
import VideoCard from "../components/VideoCard.vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

if (!store.userDetails.auth) {
    router.push("/login");
}

(async () => {
  let videos = await fetch("http://52.91.3.179/videos");
  if (videos.status === 200) {
    store.videos = await videos.json();
  }
  let watchlist = await fetch(
    "http://54.210.192.33/watchlist?user_id=" +
      store.userDetails.username.value
  );
  if (watchlist.status === 200) {
    store.watchlist = await watchlist.json();
  }
})();

async function add(video){
  console.log(video);

  let response = await fetch("http://54.210.192.33/watchlist",
    {method : "POST",
      body : JSON.stringify({
        user_id : store.userDetails.username.value,
        video_id : video
      }),
      headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
    } 
  )

  if (response.status === 200) {
    let watchlist = await fetch(
    "http://54.210.192.33/watchlist?user_id=" +
      store.userDetails.username.value
    );
    if (watchlist.status === 200) {
      store.watchlist = await watchlist.json();
    } else {
      store.watchlist = {};
    }
  }
}

async function minus(video) {
  let response = await fetch("http://54.210.192.33/watchlist",
    {method : "DELETE",
      body : JSON.stringify({
        user_id : store.userDetails.username.value,
        video_id : video
      }),
      headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
    } 
  )
  if (response.status === 200) {
    let watchlist = await fetch(
    "http://54.210.192.33/watchlist?user_id=" +
      store.userDetails.username.value
    );
    if (watchlist.status === 200) {
      store.watchlist = await watchlist.json();
    } else {
      store.watchlist = {};
    }
  }
}

</script>

<template>
  <div>
    <h1>Videos:</h1>
    <div
      class="d-flex justify-content"
      style="overflow: auto; white-space: nowrap"
    >
      <div v-bind:key="video" v-for="video in store.videos">
        <VideoCard :run = "add" :video="video" :watchlist="false" />
      </div>
    </div>
    <h1>Watchlist:</h1>
    <div
      class="d-flex justify-content"
      style="overflow: auto; white-space: nowrap"
      v-if = "store.watchlist"
    >
      <div v-bind:key="item" v-for="item in store.watchlist.Videos">
        <VideoCard :run = "minus" :watchlist="true" :video="item" />
      </div>
    </div>
    <div v-else>
      <h1 class = "text-secondary">No Videos</h1>
    </div>
  </div>
</template>
