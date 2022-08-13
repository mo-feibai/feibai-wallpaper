// electron-preload/index.ts
import {contextBridge, ipcRenderer} from 'electron'

import os from 'os';

console.log(os.platform());

contextBridge.exposeInMainWorld('electronAPI', {
    // 下载图片
    downloadPic: (imgUrl) => ipcRenderer.send('download-picture', imgUrl),

    // 获取屏幕数量
    getScreenCount: () => ipcRenderer.invoke('screen-count')
})