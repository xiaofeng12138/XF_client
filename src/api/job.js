import service from '@/utils/request.js'


//职位添加接口
export function Addjob(data){
    return service.request({
        method: "post",
        url: "/Addjob",
        data
    })
}


//职位列表查询接口
export function jobList(data){
    return service.request({
        method: "post",
        url: "/jobList",
        data
    })
}

//职位列表查询接口
export function changeJobStatus(data){
    return service.request({
        method: "post",
        url: "/changeJobStatus",
        data
    })
}
//职位列表查询接口
export function delJob(data){
    return service.request({
        method: "post",
        url: "/delJob",
        data
    })
}
//职位详情查询接口
export function queryJobById(data){
    return service.request({
        method: "post",
        url: "/queryJobById",
        data
    })
}

//职位编辑
export function editJobById(data){
    return service.request({
        method: "post",
        url: "/editJobById",
        data
    })
}


//查询所有职位列表 不带分页
export function queryAllJobListNotPage(data){
    return service.request({
        method: "post",
        url: "/queryAllJobListNotPage",
        data
    })
}






