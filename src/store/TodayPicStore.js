import {defineStore} from 'pinia'
import {reqOneWord, reqTodayPic} from "@/api";

export const useTodayPic = defineStore('todayPic', {
    state: () => ({
        imgUrl: '',
        oneWord:{}
    }),
    getters: {},
    actions: {
        async getTodayPic() {
            try {
                const {code, imgurl} = await reqTodayPic()
                if (code && code === '200') {
                    this.imgUrl = imgurl
                }
            } catch (err) {
                console.log(err)
            }
        },
        async getOneWord() {
            try {
                const res = await reqOneWord()
                if (res) {
                   this.oneWord = res
                }

            } catch (err) {
                console.log(err)
            }
        }
    }
})