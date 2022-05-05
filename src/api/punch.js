import service from "@/utils/request.js";

//打卡接口
export function AddPunch(data) {
  return service.request({
    method: "post",
    url: "/punch",
    data,
  });
}

//打卡列表
export function GetPunchList(data) {
  return service.request({
    method: "post",
    url: "/punchList",
    data,
  });
}

//删除打卡记录
export function DelPunch(data) {
  return service.request({
    method: "post",
    url: "/delPunch",
    data,
  });
}
