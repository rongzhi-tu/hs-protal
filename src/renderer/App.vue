<template>
  <div id="app" :style="appBcStyle"> 
      <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'hs-protal',
    data()
    {
      // let staticDir = process.env.NODE_ENV !== 'production' ? __static :　__dirname
      // let bgPath = require("path").join(__dirname, "./static/icons/bg.jpg").replace(/\\/g,'/')
      let bgPath = require("path").join(__dirname, "./static/icons/bg.jpg").replace(/\\/g,'/')
      // let bgPath = require("path").join(__static, "./icons/bg.jpg").replace(/\\/g,'/')
      // console.log("bgPath...",bgPath)
      let backStyle = `"width:100%;height:100%;background: url(${bgPath}) no-repeat center top;background-size: cover; background-attachment: fixed;opacity: 0.95;"`
      return {
          backStyle : backStyle,
          appBcStyle : backStyle
      }
    },
    mounted()
    {
       this.$bus.$on('event-clean-bg', () => {
         debugger
          this.appBcStyle = ""
       });
       this.$bus.$on('event-reset-bg', () => {
          this.appBcStyle = this.backStyle
          debugger
           this.$router.push({
             path:'/',
             query :{
                backLogin:true
             } 
           })
       });
       
    },
    beforeDestroy()
    {
       this.$bus.$off('event-clean-bg');
       this.$bus.$off('event-reset-bg');
    }
  }
</script>

<style>
  /* CSS */
</style>
