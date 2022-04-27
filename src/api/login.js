import service from '@/utils/request.js'


//登录接口
export function Login(data){
    return service.request({
        method: "post",
        url: "/login",
        data
    })
}



//注册接口
export function Reg(data){
    return service.request({
        method: "post",
        url: "/register",
        data
    })
}

//统计数据查询的接口
export function queryInfo(data){
    return service.request({
        method: "post",
        url: "/queryInfo",
        data
    })
}

