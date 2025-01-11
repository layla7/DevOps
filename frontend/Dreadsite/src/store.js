import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
  const userDetails = ref({ auth: false });
  const videos = ref(null);
  const watchlist = ref(null);
  const video = ref(null);

  return {
    userDetails,
    videos,
    video,
    watchlist
  };
});