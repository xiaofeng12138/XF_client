// import Cookies from "js-cookie";
// // 变量
// const tokenKey = "tokenAdmin";
// const userNameKey = "username";
// // 获取token
// export function getToken(){ return Cookies.get(tokenKey); }
// // 写入token
// export function setToken(value){ return Cookies.set(tokenKey, value); }
// // 删除token
// export function removeToken(){ return Cookies.remove(tokenKey); }
// // 写入userName
// export function setUsername(value){ return Cookies.set(userNameKey, value); }
// // 获取userName
// export function getUsername(){ return Cookies.get(userNameKey); }
// // 删除userName
// export function removeUsername(){ return Cookies.remove(userNameKey); }

import Cookie from "cookie_js";

const toKen = "admin_token";
const username = "username";
const role = "role";

export function setCookie(value) {
  return Cookie.set(toKen, value);
}

export function getCookie() {
  return Cookie.get(toKen);
}

export function removeCookie() {
  return Cookie.remove(toKen);
}

export function setUsername(value) {
  return Cookie.set(username, value);
}

export function getUsername() {
  return Cookie.get(username);
}

export function removeUsername() {
  return Cookie.remove(username);
}

//存储用户权限
export function setRole(value) {
  return Cookie.set(role, value);
}

export function getRole() {
  return Cookie.get(role);
}

export function removeRole() {
  return Cookie.remove(role);
}

//存储用户id
export function setInfo(item, value) {
  return Cookie.set(item, value);
}
export function getInfo(item) {
  return Cookie.get(item);
}
