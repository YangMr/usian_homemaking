/**
 * @author YangLing
 * @date 2021/12/30 1:53 PM
 */

//将wx.request请求转化成promise对象
function wxToPromise(method,options){
    return new Promise((resolve,reject)=>{
        options.success = resolve
        options.fail = (err)=>{
            reject(err)
        }
        wx[method](options)
    })
}

export {
    wxToPromise
}