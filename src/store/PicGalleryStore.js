import {defineStore} from 'pinia'
import {reqAllCategories, reqWallpapersByCategory} from "@/api";


export const usePicGallery = defineStore('picGallery', {
    state: () => ({
        // 所有分类
        categories: null,
        //某分类下的图片
        picsByCategory: null,
        // 当前的分类id
        curCid: null,
    }),
    getters: {
        picList(state){
            return state.picsByCategory.map(pic => pic.url)
        }
    },
    actions: {
        async getAllCategories() {
            try {
                const {errno, data} = await reqAllCategories();
                if (errno === '0') {
                    this.categories = data;
                }
            } catch (err) {
                console.log(err)
            }
        },

        async getPicsByCategory(cid, start, count) {
            try {
                const {errno, data} = await reqWallpapersByCategory(cid, start, count);
                if (errno === '0') {
                    if (!this.picsByCategory || this.curCid !== cid) {
                        this.curCid = cid
                        this.picsByCategory = data;
                    } else {
                        this.picsByCategory.push(...data)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
})