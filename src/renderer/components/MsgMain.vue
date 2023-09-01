<template>
   <div>
      <el-container class="msg-frame">
          <el-header>
              <el-page-header  @back="onBack">
                  <template slot="title">
                     <div class="header-title">&nbsp;返回主页</div>
                  </template>
                  <template slot="content">
                     <div class="header-content">&nbsp;在线消息</div>
                  </template>
              </el-page-header>
          </el-header>

          <el-main width="100%" style="height:100%; background-color: rgb(238, 241, 246)">
              <div class="other-scroll-el-menu">
                  <el-menu :default-openeds="defaultOpeneds">
                      <el-submenu index="ArchiveViewMsg">
                          <template slot="title">
                              <el-tooltip content="展示档案档案调阅的消息" placement="top">
                                  <div class="toptic-msg-lable">&nbsp;档案调阅</div>
                              </el-tooltip>
                          </template>
                          <el-menu-item index="1-0-0">
                              <el-input class="input-search"
                                        size="small"
                                        placeholder="请输入关键词搜索"
                                        prefix-icon="el-icon-search"
                                        v-model="searchArchiveValue">
                              </el-input>
                          </el-menu-item>
                          <el-menu-item v-for="(msgItem,index) in archiveMsgData" :key="index" :index="index">
                              <el-row>
                                  <el-col :span="18">
                                      <el-tooltip placement="top">
                                          <div slot="content" v-html="msgItem.tip"></div>
                                          <span> {{msgItem.name}}</span>
                                      </el-tooltip>
                                  </el-col>
                                  <el-col :span="6">
                                      <div type="primary" size="small" @click.stop="showDetailMsg(msgItem)" class="el-icon-setting other-setting-icon"></div>
                                  </el-col>
                              </el-row>
                          </el-menu-item>
                      </el-submenu>

                      <el-submenu index="RemindMsg">
                          <template slot="title">
                              <el-tooltip content="协同提醒消息" placement="top">
                                  <div class="toptic-msg-lable">&nbsp;协同提醒</div>
                              </el-tooltip>
                          </template>
                          <el-menu-item index="1-0-0">
                              <el-input class="input-search"
                                        size="small"
                                        placeholder="请输入关键词搜索"
                                        prefix-icon="el-icon-search"
                                        v-model="searchArchiveValue">
                              </el-input>
                          </el-menu-item>
                          <el-menu-item v-for="(msgItem,index) in archiveMsgData" :key="index" :index="index">
                              <el-row>
                                  <el-col :span="18">
                                      <el-tooltip placement="top">
                                          <div slot="content" v-html="msgItem.tip"></div>
                                          <span> {{msgItem.name}}</span>
                                      </el-tooltip>
                                  </el-col>
                                  <el-col :span="6">
                                      <div type="primary" size="small" @click.stop="showDetailMsg(msgItem)" class="el-icon-setting other-setting-icon"></div>
                                  </el-col>
                              </el-row>
                          </el-menu-item>
                      </el-submenu>

                       <el-submenu index="RemindMsg">
                          <template slot="title">
                              <el-tooltip content="系统广播消息" placement="top">
                                  <div class="toptic-msg-lable">&nbsp;系统广播</div>
                              </el-tooltip>
                          </template>
                          <el-menu-item index="1-0-0">
                              <el-input class="input-search"
                                        size="small"
                                        placeholder="请输入关键词搜索"
                                        prefix-icon="el-icon-search"
                                        v-model="searchArchiveValue">
                              </el-input>
                          </el-menu-item>
                          <el-menu-item v-for="(msgItem,index) in archiveMsgData" :key="index" :index="index">
                              <el-row>
                                  <el-col :span="18">
                                      <el-tooltip placement="top">
                                          <div slot="content" v-html="msgItem.tip"></div>
                                          <span> {{msgItem.name}}</span>
                                      </el-tooltip>
                                  </el-col>
                                  <el-col :span="6">
                                      <div type="primary" size="small" @click.stop="showDetailMsg(msgItem)" class="el-icon-setting other-setting-icon"></div>
                                  </el-col>
                              </el-row>
                          </el-menu-item>
                      </el-submenu>
                  </el-menu>
              </div>
          </el-main>
      </el-container>
  </div>
</template>

<script>

  let  CommApi = require('../global-static').CommApi
  export default {
    name: "MsgMain",
    data() {
      let appConfig = require('../global-static').resouceUtils.getAppConfig()
      return {
        toptics:[],  //消息主题配置信息列表   界面结构配置
        msgData:[], //消息信息内容
        defaultOpeneds:[],
        searchArchiveValue:'',
        appConfig : appConfig,
      }
    },
    methods: {
        showDetailMsg(msgItem){

        },
        onBack(){
            this.$router.push({
                path:'/protal'
            })
        }
    },
    computed : {
       //msgType = 1 : 档案调阅   msg: 
       archiveMsgData(){
          return this.msgData.filter(item => item.msgType === 1 && item.msg && CommApi.containStrIgnore(item.msg,this.searchArchiveValue)) || [];  
       }
    },
    mounted()
    {
      //  if (this.appConfig.autoLogin && !this.$route.query.backLogin){
      //    this.onSubmit()
      //  }
      //  this.$electron.ipcRenderer.send("app-had-mounted",this.appConfig);
    }
  }
</script>

<style scoped>
  .toptic-msg-lable{
    font-size: 18px;
    font-weight: bold;
  }
  .msg-frame{
    height:100%;
    display:inline-block;
    margin:0;
    padding:0;
    width:100%;
    border: 1px solid #eee;
  }

  .header-title{
    font-size: 20px;
    font-weight: bold;
    margin-top: 6px;
  }
   .header-content{
    font-size: 20px;
    font-weight: bold;
    margin-top: 6px;
  }
  .other-scroll-el-menu{
    overflow-y: scroll;
    max-height: 655px;
  }
  .other-scroll-el-menu .el-submenu__title i {
      color: #01010c;
  }
</style>

