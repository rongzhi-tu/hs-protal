import { app, BrowserWindow,ipcMain,Menu,screen,globalShortcut,Tray} from 'electron'
// import path from 'path'
// import path from 'path'
import '../renderer/store'
// import { checkUpdate } from './AutoUpdater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  //  let display = screen.getPrimaryDisplay()
  //  let width = display.bounds.width
  //  console.log('width.........................',width)
  mainWindow = new BrowserWindow({
    height: 573, 
    width: 348,
    // width: 1000,
    // x: width - 348,
    // y: 0,
    useContentSize: true,
    autoHideMenuBar: true, //隐藏系统工具栏菜单
    // title: '门户助手',
    // icon: path.join(__dirname,'../../static/cy_logo.ico').replace(/\\/g,"/"),
    minimizable: false,
    maximizable: false,
    resizable : false,
    show: false,
    // backgroundColor:'#2e2c29',
    webPreferences :{
      nodeIntegration:true,  //允许渲染进程使用nodejs
      contextIsolation:false　//允许渲染进程使用nodejs
      // devTools : false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.once('ready-to-show',() => {
    // mainWindow.setBackgroundColor('#f1f2f3')
    mainWindow.show()
    // mainWindow.webContents.openDevTools()
    // require("./EdgeDisplayBrowserWin").edgeDisplay(mainWindow,screen,app)
    globalShortcut.register('ctrl + i',() => mainWindow.webContents.openDevTools())
    globalShortcut.register('ctrl + r',() => mainWindow.webContents.reload())
     //系统托盘  生产环境使用
     if (process.env.NODE_ENV !== 'development') {
        let fileIconPath = require("path").join(__dirname, './static/icons/cy_logo.ico').replace(/\\/g, '/')
        let tray = new Tray(fileIconPath) 
        tray.setToolTip('门户助手')
        tray.on('click' , () => mainWindow.show())
    }
   
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('will-quit',() => {
  globalShortcut.unregisterAll()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const menu_tpl = [
  {
      label:'开机启动', 
      type : 'checkbox',
      checked:false,
      click()
      {
          mainWindow.webContents.send("autostart_click")
      }
  },{
    label:'在线消息', 
    click()
    {
        mainWindow.webContents.send("online_msg_click")
    }
  }, {
      label:'返回登录', 
      click(){
          mainWindow.webContents.send("backLogin")
      },
      type : 'checkbox',
      checked:false
  },
]

ipcMain.on("context-menu",(event,appConfig) =>{
    menu_tpl[0].checked = appConfig.isAutoStart;
    let meun = Menu.buildFromTemplate(menu_tpl)
    meun.popup({})
})

ipcMain.on("loginopen-setting",(event,loginOpenParam) =>{
  app.setLoginItemSettings(loginOpenParam)
})

ipcMain.on("app-had-mounted",(event,appConfig) =>{
    console.log("app-had-mounted。")
    if(appConfig.openCheckUpdate){
        require("./AutoUpdater").checkUpdate(mainWindow,appConfig)
    }
})

