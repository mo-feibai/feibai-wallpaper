<template>
  <div :style="{backgroundImage: 'url('+imgUrl+')'}" class="full"></div>
  <Menu/>
  <router-view/>
</template>

<script setup>
import {useTodayPic} from "@/store/TodayPicStore";
import {computed} from "vue";

const todayPicStore = useTodayPic();

const imgUrl = computed(() => {
  return todayPicStore.imgUrl;
})
</script>

<style scoped>
.full {
  background-size: cover;
  height: 100vh;
  filter: blur(50px);
  z-index: -1000;
}

html {
  position: relative;
  min-height: 100%
}

body {
  position: absolute;
  width: 100%;
  height: 100%;
}

</style>
