export function time() {
  let dt = new Date();
  let y = dt.getFullYear();
  let mt =
    dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
  let day =
    new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate();
  let h =
    new Date().getHours() < 10
      ? "0" + new Date().getHours()
      : new Date().getHours();
  let m =
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes();
  let s =
    new Date().getSeconds() < 10
      ? "0" + new Date().getSeconds()
      : new Date().getSeconds();
  let nowTime = `${y + "-" + mt + "-" + day + " " + h + ":" + m + ":" + s}`;
  return nowTime;
}

export function formatDate(value) {
  if (typeof value == "undefined") {
    return "";
  } else {
    let date = new Date(parseInt(value));
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
  }
}

export function formatTimeDate(startTime, endTime) {
  // var timestamp=new Date().getTime(); //计算当前时间戳
  var timestamp = Date.parse(new Date()) / 1000; //计算当前时间戳 (毫秒级)
  var date1 = ""; //开始时间
  if (timestamp < startTime) {
    date1 = startTime;
  } else {
    date1 = timestamp; //开始时间
  }
  var date2 = endTime; //结束时间
  // var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
  var date3 = (date2 - date1) * 1000; //时间差的毫秒数
  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000));
  //计算出小时数

  var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000));

  //计算相差秒数

  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000);
  console.log(days + "天 " + hours + "小时 ");
  // return   days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
  return days + "天 " + hours + "小时 " + minutes + "分钟 " + seconds + "秒 ";
}
