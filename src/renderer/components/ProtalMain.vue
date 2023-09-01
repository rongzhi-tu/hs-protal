<template>
    <div>
        <el-container style="height:calc(100%-48px);display:inline-block;margin:0;padding:0;width:100%;">
            <el-header style="background-color: #3ea8fc; height: 140px; width:100%;">
                <!-- <ProtalTop></ProtalTop> -->
                <div style="width:100%;height: 100%;display:inline-block;">
                    <div style="width:38%;height: 100%; text-align: right; float:left;">
                        <el-avatar :size="avatarSize" :src="defaultAvatarPath" style="margin-top:20px;background-color: #92cd9a;"></el-avatar>    
                    </div>
                    <div style="width:60%;height: 100%; float:right;margin-top:40px;magin-left:2%;">
                        <el-row>
                            <label class="username">{{username}}</label>
                        </el-row>
                        <el-row style="margin-top:5px;">
                            <el-col :span ="14">
                                <el-button size="small" class="rk_btn" style="color:#3ea8fc;width:100%;" round>统一门户入口</el-button> 
                            </el-col>
                            <el-col :span="10" >
                                <el-button size="small" @click="refereshData" class="el-icon-refresh" round></el-button> 
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-header>
            <!-- aaps -->
            <el-main style="height:calc(100% - 140px);width:100%;">
                <el-input size="small" class="input_search" placeholder="请输入名称/首字母搜索" prefix-icon="el-icon-search" v-model="filterValue"></el-input>
                <el-tabs v-model="activeName" class="is_stretch">
                    <el-tab-pane label="常用" name="general">
                        <div class="tab_content_div">
                            <el-menu :default-openeds="['app-guanli','app-other','app-linchuang']">
                                <el-submenu index="app-guanli">
                                    <template slot="title">
                                        <label class="meun_label">&nbsp;管理类</label>
                                    </template>
                                    <el-col :span="8" v-for="appItem in appData.commonApp.manageApp" :key="appItem.name">
                                        <el-row>
                                            <div @click.prevent="startAppItem(appItem)"><el-avatar shape="square" :size="80" :src="avatarPath(appItem)"></el-avatar></div>
                                        </el-row>
                                        <el-row>
                                            {{appItem.name}}
                                        </el-row>
                                    </el-col>
                                </el-submenu>

                                <el-submenu index="app-other">
                                    <template slot="title">
                                        <label class="meun_label">&nbsp;其它类</label>
                                    </template>
                                    <el-col :span="8" v-for="appItem in appData.commonApp.otherApp" :key="appItem.name">
                                        <el-row>
                                            <el-avatar shape="square" :size="80" :src="avatarPath(appItem)" @click="startAppItem(appItem)"></el-avatar>
                                        </el-row>
                                        <el-row>
                                            {{appItem.name}}
                                        </el-row>
                                    </el-col>
                                </el-submenu>

                                <el-submenu index="app-linchuang">
                                    <template slot="title">
                                        <label class="meun_label">&nbsp;临床类</label>
                                    </template>
                                    <el-col :span="8" v-for="appItem in appData.commonApp.linChangeApp" :key="appItem.name">
                                        <el-row>
                                            <el-avatar shape="square" :size="80" :src="avatarPath(appItem)" @click="startAppItem(appItem)"></el-avatar>
                                        </el-row>
                                        <el-row>
                                            {{appItem.name}}
                                        </el-row>
                                    </el-col>
                                </el-submenu>
                            </el-menu>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="全部" name="all">
                        <div class="tab_content_div">
                        <el-menu :default-openeds="['all-app-guanli','all-app-other','all-app-linchuang']">
                                <el-submenu index="all-app-guanli">
                                    <template slot="title">
                                        <label class="meun_label">&nbsp;管理类</label>
                                    </template>
                                    <el-col :span="8" v-for="appItem in appData.app.manageApp" :key="appItem.name">
                                        <el-row>
                                            <div @click.prevent="startAppItem(appItem)"><el-avatar shape="square" :size="80" :src="avatarPath(appItem)"></el-avatar></div>
                                        </el-row>
                                        <el-row>
                                            {{appItem.name}}
                                        </el-row>
                                    </el-col>
                                </el-submenu>

                                <el-submenu index="all-app-other">
                                    <template slot="title">
                                        <label class="meun_label">&nbsp;其它类</label>
                                    </template>
                                    <el-col :span="8" v-for="appItem in appData.app.otherApp" :key="appItem.name">
                                        <el-row>
                                            <el-avatar shape="square" :size="80" :src="avatarPath(appItem)" @click="startAppItem(appItem)"></el-avatar>
                                        </el-row>
                                        <el-row>
                                            {{appItem.name}}
                                        </el-row>
                                    </el-col>
                                </el-submenu>

                                <el-submenu index="all-app-linchuang">
                                    <template slot="title">
                                        <label class="meun_label">&nbsp;临床类</label>
                                    </template>
                                    <el-col :span="8" v-for="appItem in appData.app.linChangeApp" :key="appItem.name">
                                        <el-row>
                                            <el-avatar shape="square" :size="80" :src="avatarPath(appItem)" @click="startAppItem(appItem)"></el-avatar>
                                        </el-row>
                                        <el-row>
                                            {{appItem.name}}
                                        </el-row>
                                    </el-col>
                                </el-submenu>
                            </el-menu>
                        </div>
                    </el-tab-pane>
                </el-tabs>        
            </el-main>
        </el-container>

        <div class="footer">
            <el-row style="margin-top:5px">
                <el-col :span="8">
                    <el-button :class="statusClz" class="status_style" size="small" @click="onBtnStatus"></el-button>
                </el-col>

                <el-col :span="16" style="padding-top:5px">
                       <label >本机IP:{{'   ' + ipAddr}}</label>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
// const {ipcRenderer} = require('electron')
export default
{
    name : "ProtalMain", 
    components : 
    {
        // ProtalTop,ProtalFooter
    },
    data() {
        // let appConfig = require('../static/data/appConfig.json')
        let appConfig = require('../global-static').resouceUtils.getAppConfig()
        let fileIconPath = require('../global-static').resouceUtils.getReferenceIconPath('cir_person.png')
        return {
          avatarSize:100,
          username: appConfig.username,
          activeName:"all",
          ipAddr : this.getLocalIP(),
          statusClz: "el-icon-s-fold",
          apps: appConfig.apps || [],
          commonSize : appConfig.commonSize || 3,
          filterValue : "",
          appConfig : appConfig,
        //   defaultAvatarPath: require("path").join(__dirname, filePath).replace(/\\/g,'/')
          defaultAvatarPath: fileIconPath
        }
    },
    methods:
    {
        avatarPath(appItem)
        {
            console.log('defaultAvatarPath',this.defaultAvatarPath)
            if(!appItem.icon) {
                return this.defaultAvatarPath
            }  
            let staticFilePath = require('../global-static').resouceUtils.getReferenceIconPath(appItem.icon) 
            return require("path").join(__dirname, staticFilePath).replace(/\\/g,'/')
        },
        startAppItem(appItem)
        {
            debugger
            let appData = this.appConfig.apps.find(item => item.name === appItem.name);
            if(appData && appItem.appPath){
                require("opn")(appData.appPath + this.jsonToUrlParam(appData.param,[]))
                appData.useCount ++ 
                this.apps = this.appConfig.apps
                require('../global-static').resouceUtils.updateConfigData(this.appConfig);
            }
        },
         jsonToUrlParam(json, ignoreFields) {
             if (!json || Object.keys(json).length === 0) return ''

            return '?' + Object.keys(json)
                .filter(key => ignoreFields.indexOf(key) === -1)
                .map(key => key + '=' + json[key]).join('&');
        },
        onBtnStatus()
        {
            this.$electron.ipcRenderer.send("context-menu",this.appConfig);
        },
        onBack()
        {
            this.$bus.$emit("event-reset-bg")
        },
        gotoMsgPage(){
            this.$router.push({
                path:'/msg'
            })
        },
        getLocalIP() {
            const os = require('os');
            const osType = os.type(); //系统类型
            const netInfo = os.networkInterfaces(); //网络信息
            let ip = '';
            if (osType === 'Windows_NT') { 
                for (let dev in netInfo) {
                    //win7的网络信息中显示为本地连接，win10显示为以太网
                    if (dev === '本地连接' || dev === '以太网' || dev === 'WLAN') {
                        for (let j = 0; j < netInfo[dev].length; j++) {
                            if (netInfo[dev][j].family === 'IPv4') {
                                ip = netInfo[dev][j].address;
                                break;
                            }
                        }
                    }
                }

            } else if (osType === 'Linux') {
                ip = netInfo.eth0[0].address;
            } else if (osType === 'Darwin') {
                // mac操作系统
                // ip = netInfo.eth0[0].address;
            } else {
                // 其他操作系统
            }
            return ip;
        },

        typeApps(type) 
        {
            return this.apps.filter(item => item.type === type && this.filterQuery(item)) || [];  
        },
        commonApps(type){
            return this.apps.filter(item => item.type === type && item.useCount >= this.commonSize && this.filterQuery(item)) || [];  
        },
        filterQuery(appItemObj){
            return appItemObj.name.indexOf(this.filterValue) !== -1 || 
            appItemObj.firstLetterStr.toUpperCase().indexOf(this.filterValue.toUpperCase()) !== -1
        },
        autostartClick(){
            debugger
            let newAutoStratFlag = !this.appConfig.isAutoStart
            this.appConfig.isAutoStart = newAutoStratFlag
            require('../global-static').resouceUtils.updateConfigData(this.appConfig,() =>{
                let loginOpenParam
                if(newAutoStratFlag)
                {
                    loginOpenParam = {
                        openAtLogin : true,
                        openAsHidden : false,
                        path : process.execPath,
                        args: ['--processStart',`${require('path').basename(process.execPath)}`]
                    }
                }else 
                {
                    loginOpenParam = {
                        openAtLogin : false,
                    }
                }
                this.$electron.ipcRenderer.send("loginopen-setting", loginOpenParam)
          })
        },
        refereshData(){
            let appConfig = require('../global-static').resouceUtils.getAppConfig()
            this.username=appConfig.username
            this.ipAddr = this.getLocalIP()
            this.apps = appConfig.apps || []
            this.commonSize = appConfig.commonSize || 3
            this.filterValue = ""
            this.appConfig = appConfig
        }
    },
    mounted()
    {
        this.$bus.$emit("event-clean-bg")
        this.$electron.ipcRenderer.on("backLogin", () => this.onBack())
        this.$electron.ipcRenderer.on("autostart_click", () => this.autostartClick())
        this.$electron.ipcRenderer.on("online_msg_click", () => this.gotoMsgPage())
    },
    computed:
    {
        appData(){
            return {
                commonApp:{ //常用app
                    manageApp : this.commonApps(1), //管理类APP
                    otherApp : this.commonApps(3), //其它类APP
                    linChangeApp : this.commonApps(2) //临床类APP
                },
                app:{ //所有APP
                    manageApp : this.typeApps(1), //管理类APP
                    otherApp : this.typeApps(3), //其它类APP
                    linChangeApp : this.typeApps(2) //临床类APP
                }
            }
        }
    }
}
</script>

<style>
.tab_content_div
{
    width: 100%;
    height: 100%;
    background-color: #f1f2f3;
}
.meun_label
{
    font-size: 20px;
    font-weight: bolder;
    color: black;
}
.input_search
{
    width:100%;
}
.status_style
{
    margin-left:20px;
    background-color: #eee;
    border-style:none
}
.footer 
{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width:100%;
    height: 43px;
    background-color: #eee;
    z-index: 9999;
    vertical-align: middle;
}
.rk_btn .el-button--small{
    font-size: 20px;
}
.username 
{
    font-size: 20px;
    color: white;
    font-weight: bold;
}
.aa {
    background-color:cadetblue;
    vertical-align: middle;
    text-align: center;
    display:inline-block;
    align-content: right;
    align-items: right;
    width:100%;
    height: 100%;
    background-color: #3ea8fc;
    height: 150px;
    align-items: center;
}
</style>
