/**
 * @author YangLing
 * @date 2022/1/4 8:55 AM
 */

/**
 * 节流方法
 * @param callback
 * @param duration
 * @returns {(function(): void)|*}
 */
function throttle(callback,duration = 500) {
    //上一次所点击的时间
    let lastTime = 0
    return function (){
        //获取当前所点击的时间
        let now = new Date().getTime()
        //如果当前所点击的时间 - 上一次所点击的时间 >= 指定的时间，才能执行回调函数， 否则的化不能执行
        if(now - lastTime >= duration){
            callback.call(this,...arguments)
        }
        lastTime = now
    }
}

export {throttle}