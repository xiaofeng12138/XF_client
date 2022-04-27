import service from '@/utils/request.js'


//查询职位列表
export function queryJobBydep(data){
    return service.request({
        method: "post",
        url: "/queryJobBydep",
        data
    })
}


//员工添加
export function AddStaff(data){
    return service.request({
        method: "post",
        url: "/AddStaff",
        data
    })
}
//员工详情
export function queryStaffById(data){
    return service.request({
        method: "post",
        url: "/queryStaffById",
        data
    })
}

//员工列表查询
export function staffList(data){
    return service.request({
        method: "post",
        url: "/staffList",
        data
    })
}

//员工编辑
export function editStaffById(data){
    return service.request({
        method: "post",
        url: "/editStaffById",
        data
    })
}

//员工编辑
export function delStaff(data){
    return service.request({
        method: "post",
        url: "/delStaff",
        data
    })
}

//获取七牛云token
export function getToken(data={}){
    return service.request({
        method: "post",
        url: "/getToken",
        data
    })
}






