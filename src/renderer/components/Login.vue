<template>
    <div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="my_form_style">
          <div class="from_layout">
              <h1 class="login_title" >欢迎登录门户助手</h1>
              <el-form-item label="账号" prop="username">
                  <el-input type="text" placeholder="请输入账号"  size="small" v-model="form.username"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                  <el-input type="password" placeholder="请输入密码"  size="small" v-model="form.password"/>
              </el-form-item>
              <el-form-item>
                  <el-row>
                      <el-col :span="12">
                          <el-checkbox v-model="form.chkAutoLogin"  size="small">自动登录</el-checkbox>
                      </el-col>
                      <el-col :span="12">
                          <el-checkbox v-model="form.chkRemmeber"  size="small">记住密码</el-checkbox>
                      </el-col>
                      <!-- <el-col :span="8">
                          <a href="#">CA登录</a>
                      </el-col> -->
                  </el-row>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" style="width:100%" size="small" v-on:click="onSubmit">登录</el-button>
              </el-form-item>
          </div>
            
        </el-form>
    </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      let appConfig = require('../global-static').resouceUtils.getAppConfig()
      return {
        form: {
          username: appConfig.rememberPwd ? appConfig.username : "",
          password: appConfig.rememberPwd ?  appConfig.password : "",
          chkAutoLogin: appConfig.autoLogin,
          chkRemmeber: appConfig.rememberPwd,
        },
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },
        appConfig : appConfig
      }
    },
    methods: {
      // getAppConfig(){
      //   if(process.env.NODE_ENV === 'production'){
      //     return require('./static/data/appConfig.json')
      //   }
      //   return require('../static/data/appConfig.json');
      // },
      onSubmit() {
        // 为表单绑定验证功能
        this.$refs.loginForm.validate(valid => {
            if(valid && this.form.username === this.appConfig.username && this.form.password === this.appConfig.password){
                //将背景色取消掉
                debugger
                if(this.form.chkRemmeber !== this.appConfig.rememberPwd || this.form.chkAutoLogin !== this.appConfig.autoLogin)
                {
                  this.appConfig.rememberPwd = this.form.chkRemmeber
                  this.appConfig.autoLogin = this.form.chkAutoLogin
                  require('../global-static').resouceUtils.updateConfigData(this.appConfig,() => this.$router.push("/protal"))
                  return
                }
                // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                this.$router.push("/protal");
            }else{
                this.$message({
                    showClose:true,
                    message: '用户名或密码错误',
                    type: 'error'
                });
                return false;
            }
        });
      },
    },
    mounted()
    {
      debugger
       if (this.appConfig.autoLogin && !this.$route.query.backLogin){
         this.onSubmit()
       }
       this.$electron.ipcRenderer.send("app-had-mounted",this.appConfig);
    }
  }
</script>

<style scoped>
  .my_form_style {
    border: 1px solid #DCDFE6;
    /* width: 350px; */
    width: 80%;
    display: inline-block;
    /* margin: 220px 50px auto; */
    margin-top: 66%;
    margin-left: 10%;
    /* padding: 30px 20px 0px 0px; */
    padding-top: 30px;
    /* padding-right: 6%; */
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }
  .from_layout{
    padding-right: 7%;
  }

  .login_title {
    text-align: center;
    font-size: 22px;
    /* margin: 0 auto 40px auto; */
    margin-bottom: 10px;
    color: #1d0fe4;
  }

 

  .el-checkbox {
       color: #000;
  }

  a {
    text-decoration: none;
  }
</style>

