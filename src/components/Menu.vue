<template>
  <el-menu
      :default-active="curFullPath"
      class="menu"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
  >
    <el-col :span="4" :offset="8" class="menu-col">
      <el-menu-item index="/todayPic" class="navbar-header">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Today"></use>
        </svg>
        <span class="navbar-title">每日一图</span>
      </el-menu-item>
    </el-col>
    <el-col :span="4">
      <el-menu-item index="/picGallery" class="navbar-header">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-6Collection_01"></use>
        </svg>
        <span class="navbar-title">图片集锦</span>
      </el-menu-item>
    </el-col>
  </el-menu>
  <div class="h-6"/>
</template>

<script setup>
import {computed} from 'vue'
import {useRouter} from "vue-router";

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

// 路由
const router = useRouter()

const curFullPath = computed(() => {
  return router.currentRoute.value.fullPath;
})
</script>

<style scoped>
.navbar-header {
  font-size: 18px;
  font-weight: bolder;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: 6px
}

.menu-col {
  border-radius: 10px;
}

.menu {
  margin-top: 1px;
}


.el-menu {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 5%;
  background: transparent !important;
}

.el-menu-item {
  height: 100%;
}

.el-menu-item.is-active {
  background-color: rgb(196, 217, 227) !important;
}

.el-menu-item:hover {
  background-color: rgb(229, 208, 140) !important;
}

.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.navbar-title{
  margin-left: 10px;
}

</style>
