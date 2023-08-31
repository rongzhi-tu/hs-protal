# hs-protal

> hs protal electron app

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build



```
## 注意事项    
> 打包前需要把render下的静态目录static数据复制到根目录的static目录下

## 0.0.1版本使用试
> 安装包安装   
> 安装目录/resource/appConfig.json是整个助手程序依赖的配置文件，目前配置程都需要手动修改这里，修改保存后点主页的刷新按钮就可以。需要注意的是，json文件里不要写不相干的配置信息和删除其它主要配置信息，也不要写注释类的文字。

## 0.0.1自动更新功能
> 自动更新需要配置一个服务node ./UpdateTaskServer.js，代码在update_server目录里，将最新版本的安装包及yml配置文件打包复制到./static目录里，然后修改助手json中的openCheckUpdate为true以及更新的服务器地址updateServerPath值，重启客户端进行更新检测
---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
