// 封装axios请求模块

import axios  from 'axios'


//先创建一个axios实例
var request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基础路径
})

//请求拦截器
request.interceptors.request.use(
    //所有请求都会经过这里，config是当前请求相关的配置信息对象，config是可以修改的
    function (config) {
        const user = JSON.parse(window.localStorage.getItem('user'))

        //判断如果有登录信息，这统一设置token
        if(user){
            config.headers.Authorization = `Bearer ${user.token}`
        }
        return config
    },
    function (err) {
        return Promise.reject(err)
    }
)

//导出请求方法
export default request