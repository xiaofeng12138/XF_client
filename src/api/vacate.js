import service from '@/utils/request.js'


//用户可请假列表查询
export function queryAllVacateUse(data){
    return service.request({
        method: "post",
        url: "/queryAllVacateUse",
        data
    })
}

//新增请假
export function addvacate(data){
    return service.request({
        method: "post",
        url: "/addvacate",
        data
    })
}

//请假列表查询
export function queryVacatelist(data){
    return service.request({
        method: "post",
        url: "/queryVacatelist",
        data
    })
}

//请假数据删除
export function delvacate(data){
    return service.request({
        method: "post",
        url: "/delvacate",
        data
    })
}





