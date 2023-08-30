//检测服务器版本更新
(function () {

    const { autoUpdater } = require('electron-updater')
    const { dialog, app } = require('electron')



    exports.checkUpdate = (mainWindow,appConfig) => {
        const autoServerPath = appConfig.updateServerPath ; //'http://127.0.0.1:9010/'
        console.log('autoServerPath: ',autoServerPath)
        // if (process.platform === 'darwin') {
        //     autoUpdater.setFeedURL(`"${autoServerPath}/darwin"`)
        // } else {
        //     autoUpdater.setFeedURL(`"${autoServerPath}/win32"`)    
        // }
        console.log('运行环境：', process.env.NODE_ENV)
        // if (process.env.NODE_ENV === 'development') return
        if (process.env.NODE_ENV === 'development') {
            autoUpdater.updateConfigPath = require('path').join(__dirname, '../update_server/static/latest.yml')
        }   
        console.log('版本号: ',require('/package.json').version)
        autoUpdater.currentVersion = require('/package.json').version
        autoUpdater.setFeedURL(autoServerPath)
        console.log('版本检测中...........')
  
        // 开始检测更新
        autoUpdater.checkForUpdates()

        // error
        autoUpdater.on('error', (err) => {
            console.log(err)
        })
        // 发现新版本
        autoUpdater.on('update-available',() =>{

        })
        // console.log('dialog.showMessageBox ： ', dialog.showMessageBox)
        // 新版本下载完成
        autoUpdater.on('update-downloaded',() =>{
            console.log('新版本下载完成,确认是否更新.....')
            dialog.showMessageBox(mainWindow, {
                type: 'question',
                title :　'应用更新',
                message : '发现新版本，是否更新 ?',
                buttons : ['是','否']
            }, btnIndex =>{
                console.log('btnIndex: ' , btnIndex)
                if(btnIndex === 0){
                        autoUpdater.quitAndInstall()
                        app.quit()
                }
            })  
        })
    }
})()





