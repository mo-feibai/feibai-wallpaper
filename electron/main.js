import {join} from 'path'
import {app, BrowserWindow, Menu} from 'electron'
import installExtension from 'electron-devtools-installer';
import {initIpcMain} from "./IpcMain.js";

export const ROOT_PATH = {
    // /dist
    dist: join(__dirname, '../..'),
    // /dist or /public
    public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

let win
// Here, you can also use other preload
const preload = join(__dirname, './preload.js')
//  Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`


function createWindow() {
    win = new BrowserWindow({
        width: 1440,
        height: 840,
        minWidth: 1080,
        minHeight: 720,
        titleBarStyle: 'hiddenInset',
        icon: join(ROOT_PATH.public, 'favicon.ico'),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload,

        },
    })

    // 安装vuejs工具
    installExtension( 'nhdogjmejiglipccpnnnanhbledajbpd')
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    // init ipcMain
    initIpcMain(win,app);


    if (app.isPackaged) {
        win.loadFile(join(ROOT_PATH.dist, 'index.html'))
    } else {
        win.loadURL(url)
    }

    //打开开发者工具
    win.webContents.openDevTools({ mode: 'detach' })
}

app.on('window-all-closed', () => {
    win = null
})

app.whenReady().then(createWindow)

//取消菜单栏
Menu.setApplicationMenu(null)

