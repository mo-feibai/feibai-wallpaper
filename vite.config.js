import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'
import electron from 'vite-plugin-electron';

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        // 定义别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@router': path.resolve(__dirname, 'src/router'),
        }
    },
    server: {
        host: '127.0.0.1',
        port: 5432,//更改启动端口
        // 反向代理
        proxy: {
            '/api': {
                target: 'https://imgapi.cn',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/pic': {
                target: 'http://wallpaper.apc.360.cn/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/pic/, '')
            },
            '/word': {
                target: 'https://v1.hitokoto.cn/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/word/, '')
            }
        }
    },
    plugins: [
        vue(),
        // electron的配置
        electron({
            main: {
                entry: 'electron/main.js',
            },
            preload: {
                // Must be use absolute path, this is the limit of rollup
                input: path.join(__dirname, './electron/preload.js'),
            },
            // Enables use of Node.js API in the Renderer-process
            renderer: {},
        }),
        // element-plus自动导入
        AutoImport({

            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],
            resolvers: [
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),],
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],

        }),
        Icons({
            autoInstall: true,
        }),
        Inspect(),
    ],
    build: {
        emptyOutDir: false, // 必须配置，否则electron相关文件将不会生成build后的文件
    },
})
