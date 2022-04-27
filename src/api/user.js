import service from "@/utils/request.js";

//用户列表查询
export function queryUser(data) {
  return service.request({
    method: "post",
    url: "/queryUser",
    data,
  });
}

//用户权限修改
export function updateRole(data) {
  return service.request({
    method: "post",
    url: "/updateRole",
    data,
  });
}

//用户删除
export function DelUsers(data) {
  return service.request({
    method: "post",
    url: "/delUser",
    data,
  });
}

//用户手动添加
export function userAdd(data) {
  return service.request({
    method: "post",
    url: "/addUser",
    data,
  });
}

//获取七牛云token
export function getToken(data = {}) {
  return service.request({
    method: "post",
    url: "/getToken",
    data,
  });
}

//人员信息录入接口
export function addUserInfo(data) {
  return service.request({
    method: "post",
    url: "/addUserInfo",
    data,
  });
}

//人员信息列表查询
export function queryUserInfo(data) {
  return service.request({
    method: "post",
    url: "/queryUserInfo",
    data,
  });
}

//人员信息详情查询
export function queryDetailed(data) {
  return service.request({
    method: "post",
    url: "/queryDetailed",
    data,
  });
}

//人员信息编辑
export function updateUserInfo(data) {
  return service.request({
    method: "post",
    url: "/updateUserInfo",
    data,
  });
}

//人员信息删除
export function delUserInfo(data) {
  return service.request({
    method: "post",
    url: "/delUserInfo",
    data,
  });
}

//用户信息查询
export function queryAllInfo(data) {
  return service.request({
    method: "post",
    url: "/queryAllInfo",
    data,
  });
}

//用户列表查询
export function queryUserList(data) {
  return service.request({
    method: "post",
    url: "/queryUserList",
    data,
  });
}

//用户删除
export function delUser(data) {
  return service.request({
    method: "post",
    url: "/delUser",
    data,
  });
}

//用户激活
export function useUser(data) {
  return service.request({
    method: "post",
    url: "/useUser",
    data,
  });
}
