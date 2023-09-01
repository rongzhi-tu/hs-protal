// 
(
    function () {

        exports.resouceUtils = {
            initFlag : false,
            appConfigPath : null,
            //  file path 
            envDirStaticFilePath(staticFilePath) {
                return this.envStaticDir() + staticFilePath
            },
            envStaticDir() {
                console.log('process.env.NODE_ENV : ', process.env.NODE_ENV)
                // if(process.env.NODE_ENV === 'production'){
                //     return "./static/";
                // }
                return "./static/"
            },
            getAppConfigPath() {
                return this.nappConfigPath
            },
            getReferenceIconPath(icon) {
                let staticFilePath = this.envDirStaticFilePath('icons/' + icon)
                let filePath = require("path").join(__dirname, staticFilePath).replace(/\\/g, '/')
                console.log('icon filePath: ', filePath)
                return filePath
            },
            getAppConfig() {
                return JSON.parse(require('fs').readFileSync(this.appConfigPath,'utf-8'))
            },
            getAppConfigTamplate() {
                // if(process.env.NODE_ENV === 'production'){
                //   return require('./static/data/appConfig.json')
                // }
                return require('./static/data/appConfig.json');
            },
            updateConfigData(appConfig, callBack) {
                require("fs").writeFile(this.appConfigPath, JSON.stringify(appConfig), (err) => {
                    console.log(err ? '更新配置文件失败:' + err : '更新配置文件成功')
                    if (!err && callBack instanceof Function) callBack()
                })
            },
            initConfig(){
                //init app config
                if  (!this.initFlag || this.appConfigPath === null){
                    console.log('process.env.NODE_ENV : ', process.env.NODE_ENV)
                    if(process.env.NODE_ENV === 'production'){
                        this.appConfigPath = require("path").join(__dirname, '../../../appConfig.json')
                    }else{
                        this.appConfigPath = require("path").join(__dirname, './appConfig.json')
                    }

                    console.log('init app config: ',this.appConfigPath )
                    try {
                        if (!require('fs').existsSync(this.appConfigPath)) {
                            require('fs').writeFileSync(this.appConfigPath,  JSON.stringify(this.getAppConfigTamplate()), 'utf-8');
                        }
                        console.log("appConfig.json文件初始化完成：");
                        console.log(require('fs').readFileSync(this.appConfigPath,'utf-8'))
                        //打印当前配置
                    } catch(err) {
                        console.error(err)
                    }
                    this.initFlag = true 
                }
            }
        }

        exports.CommApi = {
            containStrIgnore(data,filterValue){
                filterValue = filterValue + ''
                return data.indexOf(filterValue) !== -1 || 
                data.toUpperCase().indexOf(filterValue.toUpperCase()) !== -1
            }
        }
    }
)()