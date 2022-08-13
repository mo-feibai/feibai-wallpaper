import {ipcMain} from 'electron'
import path from 'path'
import {execFile} from 'node:child_process'

const util = require('node:util');
const syncExecFile = util.promisify(require('node:child_process').execFile);


export function initIpcMain(win, app) {
    ipcMain.on('download-picture', (event, imgUrl) => {
        let time = new Date().getTime();
        downloadFileToFolder(imgUrl, time, "jpg", win, app)
    })
    ipcMain.handle('screen-count', () => {
        return getScreenCount(app)
    })
}

/**
 *  @description 下载文件到指定目录
 *  @param {string} url 文件下载链接
 *  @param {number} fileName 文件名称
 *  @param {string} fileType 文件格式
 *  @param win 窗口
 *  @param app 应用
 *  @author mofeibai
 */
function downloadFileToFolder(url, fileName, fileType, win, app) {
    win.webContents.downloadURL(url);
    win.webContents.session.once('will-download', (event, item) => {
        //设置保存路径
        const filePath = path.join(app.getAppPath(), '/download', `${fileName}.${fileType}`);
        item.setSavePath(filePath);
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log('completed', filePath);
                execFile(path.join(app.getAppPath(), '/electron/screenCount.sh'), (error, stdout) => {
                    if (error) {
                        throw error;
                    }
                    console.log(stdout);
                });
            }
        })

    })
}


async function getScreenCount(app) {
    const { stdout } = await syncExecFile(path.join(app.getAppPath(), '/electron/screenCount.sh'));
    return stdout;
}