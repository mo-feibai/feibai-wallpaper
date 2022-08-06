import http from '@/utils/http.js';

export const request = {
    get(url, params) {
        const config = {
            method: 'GET',
            url
        }
        if (params) {
            config.params = params
        }
        return http(config)
    },
    post(url, params){
        const config = {
            method: 'POST',
            url
        }
        if (params) {
            config.data = params
        }
        return http(config)
    }
}