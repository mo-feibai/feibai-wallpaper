import {createRouter, createWebHashHistory} from 'vue-router'
import routes from '@router/routes.js';


const router = createRouter({
    history:createWebHashHistory(),
    routes,
    scrollBehavior() {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
});


export default router;