<template>
  <div class="todayPic">
    <div class="back" @mouseover="buttonIsShow= true" @mouseleave="buttonIsShow= false">
      <img src="../assets/computer.svg" class="computer" alt="computer">
      <el-image :src="imgUrl" class="front" alt="pic" fit="fill" :preview-src-list="imgList" :initial-index="1">
        <template #error>
          <div class="image-slot">
            <el-icon>
              <icon-picture/>
            </el-icon>
          </div>
        </template>
      </el-image>
      <div class="operation">
        <transition-group
            appear
            name="animate__animated animate__bounce"
            enter-active-class="animate__backInLeft"
            leave-active-class="animate__backOutRight"
        >
          <div v-show="buttonIsShow" key="2" class="button-group">
            <button class="button" @click="download(imgUrl)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-download"></use>
              </svg>
            </button>

            <button class="button" @click="loadNextPic">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-next"></use>
              </svg>
            </button>
          </div>
          <div v-show="!buttonIsShow" key="1">
            <p class="hitokoto">{{ oneWord.hitokoto }}</p>
            <p class="hitokoto-info">{{ oneWordInfo }}</p>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useTodayPic} from '@/store/TodayPicStore.js';
import {Picture as IconPicture} from '@element-plus/icons-vue'
import {computed, ref} from "vue";
import '@/assets/fonts/font.css';

// electron中与主线程通信
const {electronAPI} = window

// 获取图片地址
const imgUrl = computed(() => {
  return todayPicStore.imgUrl;
})

const todayPicStore = useTodayPic()

// 加载图片
if (!imgUrl.value) {
  todayPicStore.getTodayPic()
}

// 是否隐藏按钮
const buttonIsShow = ref(false);

// 下载图片
const download = (aImgUrl) => {
  if (aImgUrl) {
    electronAPI.downloadPic(aImgUrl)
  }
}

// 加载下一张图片
const loadNextPic = () => {
  todayPicStore.getTodayPic()
}

// 将图片地址封装为列表
const imgList = computed(() => {
  let list = [];
  list.push(imgUrl.value);
  return list;
})

// 获取一言
const oneWord = computed(() => {
  return todayPicStore.oneWord;
})

if (Object.keys(oneWord.value).length === 0) {
  todayPicStore.getOneWord();
}
// 一言的作者和出处
const oneWordInfo = computed(() => {
  const author = oneWord.value.from_who || '无名'
  const provenance = oneWord.value.from || 'xx'
  return `--- 【${provenance}】 ${author}`;
})

//获取屏幕数量
const screenCount = computed(() => {
  // 这里为什么没有映射？？不太了解
  return todayPicStore.$state.screenCount;
})



</script>

<style scoped>

li, a {
  list-style-type: none;
  text-align: center;
  margin-bottom: 20px;
  font-family: FZXingKJWL, serif;
  text-decoration: none;
}

a:visited {
  color: #d4872f;
}

.front {
  position: absolute;
  top: 5%;
  bottom: 20%;
  left: 4.5%;
  right: 4.5%;
  overflow: hidden;
  z-index: -1
}

img {
  width: 100%;
  vertical-align: middle;
  background-size: cover;
}

.back {
  position: absolute;
  top: 10%;
  left: 30%;
  width: 40%;
  float: right;
  z-index: 1;
}

.button {
  position: relative;
  top: 18%;
  bottom: 18%;
  height: 62%;
  width: 5.6%;
  background: #ffffff;
  border: 2px solid #020709;
  box-shadow: 0 0 20px;
  border-radius: 50%;
}

.button-group {
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.image-slot .el-icon {
  font-size: 30px;
}

.todayPic {
  overflow: hidden;
  position: absolute;
  bottom: 0;
  top: 5%;
  left: 0;
  right: 0;
}

.operation {
  position: absolute;
  bottom: -16%;
  left: -20%;
  width: 140%;
  height: 15%;
  z-index: 1;
  border: 2px solid #f1f5f6;
  border-radius: 10px;
  box-shadow: 0 0 20px;
  vertical-align: middle;
  color: white
}

.hitokoto {
  margin-top: 1%;
  font-size: 22px;
  text-align: center;
  font-family: FZXingKJWB, serif;
}

.hitokoto-info {
  font-size: 18px;
  float: right;
  margin-right: 1%;
  font-family: FZXingKJWL, serif;
}
</style>