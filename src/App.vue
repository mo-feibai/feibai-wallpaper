<template>
  <div :style="{backgroundImage: 'url('+imgUrl+')'}" class="full"></div>
  <Menu/>
  <router-view/>
</template>

<script setup>
import {useTodayPic} from "@/store/TodayPicStore";
import {computed} from "vue";

const todayPicStore = useTodayPic()
const {electronAPI} = window

const imgUrl = computed(() => {
  return todayPicStore.imgUrl
})

// 初始化获取屏幕的数量
todayPicStore.$patch(async (state) => {
  let screenCount = await electronAPI.getScreenCount();
  state.screenCount = Number(screenCount)
})
</script>

<style>
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

.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>
