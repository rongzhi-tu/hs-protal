//实现electron 自动显示与隐藏功能
(function(){

    // import { screen } from 'electron'
    exports.edgeDisplay = (browserWindow,screen,app) => {
        let display = screen.getPrimaryDisplay()
        let {width,height} = display.workAreaSize;

        let winSize = browserWindow.getSize()
        let maxY = height - winSize[1]
        let maxX = width - winSize[0]
        // browserWindow.setPosition(width- browserWindow.getSize()[0], 0)  //右上角
        // browserWindow.setPosition(maxX, maxY)  //右下角

        let moving_interval = null
      
        browserWindow.on('move', () => {
            let position = browserWindow.getPosition();
            let p_x = position[0]
            let p_y = position[1]
            let outFlag = false
            if  (p_x < 0) p_x = 0,outFlag = true
            if  (p_y < 0) p_y = 0,outFlag = true
            if  (p_x > maxX) p_x = maxX,outFlag = true
            if  (p_y > maxY ) p_y = maxY,outFlag = true

            if  (moving_interval) clearInterval(moving_interval)
            if  (outFlag)
            {
                moving_interval = setInterval(() => {
                    //browserWindow设定不移出屏幕  如果用setPosition  高的宽度会乱扩大
                    browserWindow.setBounds({
                        x:p_x,
                        y:p_y,
                        width : winSize[0],
                        height : winSize[1]
                    })
                },15)
            }
        })

        let bSize = 2
        //win是否在边缘
        let isEdgeWin = () => {
            let position = browserWindow.getPosition();
            let p_x = position[0]
            let p_y = position[1]
            
            return p_x === 0 || (p_x + bSize) >= maxX || p_y === 0 || (p_y + bSize) >= maxY
        }
        //当前鼠标是否在win边缘内
        let currentCursorInWin = () => {
            let position = browserWindow.getPosition();
            let currentCursorPoint = screen.getCursorScreenPoint()  //当前鼠标绝对位置
            let p_x = position[0]
            let p_x_end = p_x + winSize[0]
            let p_y = position[1]
            let p_y_end = p_y + winSize[1]

            return currentCursorPoint.x >= p_x && currentCursorPoint.x <= p_x_end &&
                    currentCursorPoint.y >= p_y && currentCursorPoint.y <= p_y_end
        }
        //当前鼠标是否屏幕的边缘上
        let currentCusorAtEdge = () =>
        {
            let currentCursorPoint = screen.getCursorScreenPoint()  //当前鼠标绝对位置
            return currentCursorPoint.x === 0 || currentCursorPoint.y === 0 || 
                currentCursorPoint.x + bSize >= width || currentCursorPoint.y + bSize + 10 >= height
        }
        //开启监测任务
        let moniter_interval = setInterval(() => {
            if (!isEdgeWin()) return //不在边缘直接不执行

            if(browserWindow.isVisible()){ //当前是显示状态
                if (!currentCursorInWin()){ //鼠标已经不在窗口里了
                    browserWindow.hide()  
                }
            }else{
                if (currentCursorInWin() && currentCusorAtEdge()){
                    browserWindow.show()
                }
            }
        },1000)

        app.on('will-quit',() => {
            if (moniter_interval) clearInterval(moniter_interval)
            if (moving_interval) clearInterval(moving_interval)
        })
    } 
})()