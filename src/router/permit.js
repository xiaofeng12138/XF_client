import router from "./index";
// cookie
// ElementUI 单独引入
import { Message } from 'element-ui';''
import { getCookie } from "@/utils/cookies";
// 全局前置守卫
router.beforeEach((to, from, next) => {
    if(getCookie()){
        next();
    }else{
        if(to.path === "/login") { // 这里是处理 login 页面的时候，没有 token
            next();
        }else{
            next({ path: "/login" });  // 这里是处理管理后台时没有 token ，进行 path 路由指向。
            Message.error('请先登录')
        }
    }
})