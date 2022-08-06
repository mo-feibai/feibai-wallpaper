<template>
  <div class="PicGallery">
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-select v-model="platform" class="m-2" size="large" placeholder="请选择平台">
          <el-option
              label="360壁纸"
              value="360Wallpaper"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="selectedCategory" class="m-2" size="large" @change="getPicsByCategory" placeholder="请选择分类">
          <el-option
              v-for="category in allCategories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-divider style="width: 80%;margin-left: 10%"/>
    <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-immediate="false"
         infinite-scroll-distance="20"
    >
      <el-row :gutter="20" justify="space-evenly">
        <el-col :span="8" v-for="(pic,index) in picGalleryStore.picsByCategory">
          <el-image :key="pic.pid" :src="pic.url" :preview-src-list="picGalleryStore.picList"
                    :initial-index="index">
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <icon-picture/>
                </el-icon>
              </div>
            </template>
          </el-image>
        </el-col>
      </el-row>
    </div>
    <p class="loading_tip" v-if="loading">Loading...</p>
  </div>
</template>

<script setup>

import {Picture as IconPicture} from '@element-plus/icons-vue'
import {usePicGallery} from "@/store/PicGalleryStore";
import {computed, ref} from "vue";

const picGalleryStore = usePicGallery()

// 加载所有的分类
picGalleryStore.getAllCategories()

// 所有的分类
const allCategories = computed(() => {
  return picGalleryStore.categories;
})

// 选中的分类
const selectedCategory = ref("")
// 开始个数
const start = ref(9)

// 根据选中分类获取图片
const getPicsByCategory = () => {
  picGalleryStore.getPicsByCategory(selectedCategory.value, 0, 9)
  start.value = 9;
}


// 是否加载
const loading = ref(false)
// 是否禁止无限滚动
const disabled = computed(() => loading.value)

// 无限滚动出发事件
const load = async () => {
  loading.value = true
  await picGalleryStore.getPicsByCategory(selectedCategory.value, start.value, 3)
  loading.value = false
  start.value += 3
}

// 平台
const platform = ref(null)
</script>

<style scoped>

.PicGallery {
  overflow: auto;
  position: absolute;
  bottom: 0;
  top: 10%;
  right: 2%;
  left: 2%;
}

.el-row {
  width: 96%;
  text-align: right;
  vertical-align: middle;
}

.el-row .el-select {
  float: left;
}

.el-row .el-col {
  vertical-align: middle;

}

.el-image {
  border-radius: 10px;
  height: 100%;
  width: 100%;
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

.loading_tip {
  height: 20px
}

/*设置宽度,轨道颜色*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: #0e0c0c; /*可以设置轨道颜色*/
  padding-right: 1px;
}

/*滚动条*/
::-webkit-scrollbar-thumb {
  background: #19c9a0;
  border-radius: 10px;
}


</style>
