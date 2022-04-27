import service from '@/utils/request.js'


//部门添加接口
export function AddDepartment(data){
    return service.request({
        method: "post",
        url: "/Adddeap",
        data
    })
}


//部门列表查询
export function queryDepList(data){
    return service.request({
        method: "post",
        url: "/departList",
        data
    })
}


//修改部门状态
export function changeDepStatus(data){
    return service.request({
        method: "post",
        url: "/changeDepStatus",
        data
    })
}



//删除部门
export function delDepartment(data){
    return service.request({
        method: "post",
        url: "/delDepartment",
        data
    })
}

//查询部门详情
export function queryDepById(data){
    return service.request({
        method: "post",
        url: "/queryDepById",
        data
    })
}

//部门编辑提交接口
export function editDepById(data){
    return service.request({
        method: "post",
        url: "/editDepById",
        data
    })
}


//部门列表可用查询

export function queryUseDepList(data){
    return service.request({
        method: "post",
        url: "/queryUseDepList",
        data
    })
}

