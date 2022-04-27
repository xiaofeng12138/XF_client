import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout"
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "Login",
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "控制台",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/consoleIndex",
        name: "ConsoleIndex",
        meta: {
          title: "首页"
        },
        component: () => import("../views/Console/index.vue"),
      }
    ],
  },
  {
    path: "/parking",
    name: "Parking",
    meta: {
      title: "部门管理",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/departmentIndex",
        name: "DepartmentIndex",
        meta: {
          title: "部门列表"
        },
        component: () => import("../views/department/index.vue"),
      },
      {
        path: "/departmentAdd",
        name: "DepartmentAdd",
        meta: {
          title: "部门添加"
        },
        component: () => import("../views/department/departAdd.vue"),
      }
    ],
  },
  {
    path: "/person",
    name: "Person",
    meta: {
      title: "职位管理",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/jobIndex",
        name: "JobIndex",
        meta: {
          title: "职位列表"
        },
        component: () => import("../views/job/index.vue"),
      },
      {
        path: "/jobAdd",
        name: "JobAdd",
        meta: {
          title: "职位添加"
        },
        component: () => import("../views/job/jobadd.vue"),
      }
    ],
  },
  {
    path: "/person",
    name: "Person",
    meta: {
      title: "员工管理",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/staffIndex",
        name: "StaffIndex",
        meta: {
          title: "员工列表"
        },
        component: () => import("../views/staff/index.vue"),
      },
      {
        path: "/staffAdd",
        name: "StaffAdd",
        meta: {
          title: "员工添加"
        },
        component: () => import("../views/staff/staffadd.vue"),
      }
    ],
  },
  {
    path: "/vacate",
    name: "Vacate",
    meta: {
      title: "请假管理",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/vacateIndex",
        name: "VacateIndex",
        meta: {
          title: "请假列表"
        },
        component: () => import("../views/vacate/index.vue"),
      },
      {
        path: "/vacateAdd",
        name: "VacateAdd",
        meta: {
          title: "新增请假"
        },
        component: () => import("../views/vacate/vacateadd.vue"),
      }
    ],
  },
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          title: "用户列表"
        },
        component: () => import("../views/user/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
