const Koa = require('koa')


const app = new Koa()

const static = require('koa-static')

const path = require('path')

// console.log("app use :",path.join(__dirname,'./static'))
app.use(static(path.join(__dirname,'./static')))

app.listen(9010, () => console.log('服务器启动成功'))