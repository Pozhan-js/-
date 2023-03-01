// src/routes/index.tsx
import React, { lazy, Suspense, FC } from "react";
import { useRoutes } from "react-router-dom";
import { HomeOutlined, ShopOutlined } from "@ant-design/icons";
import type { XRoutes } from "./types";

import {
  Layout,
  EmptyLayout,
  CompLayout
} from "../layouts";
import Loading from "@comps/Loading";
import Redirect from "@comps/Redirect";

const Login = lazy(() => import("@pages/login"));
const Dashboard = lazy(() => import("@pages/dashboard"));
const NotFound = lazy(() => import("@pages/404"));

const HospitalList = lazy(() => import("@pages/hospital/hospitalList"));
const HospitalShow = lazy(() => import("@pages/hospital/hospitalList/components/HospitalShow"));
const HospitalSchedule = lazy(() => import("@pages/hospital/hospitalList/components/HospitalSchedule"));

const HospitalSet = lazy(() => import("@pages/hospital/hospitalSet"));
const HospitalSetAddOrUpdate = lazy(() => import("@pages/hospital/hospitalSet/components/HospitalSetAddOrUpdate"))

const load = (Comp: FC) => {
  return (
    // 因为路由懒加载，组件需要一段网络请求时间才能加载并渲染
    // 在组件还未渲染时，fallback就生效，来渲染一个加载进度条效果
    // 当组件渲染完成时，fallback就失效了
    <Suspense fallback={<Loading />}>
      {/* 所有lazy的组件必须包裹Suspense组件，才能实现功能 */}
      <Comp />
    </Suspense>
  );
};

const routes: XRoutes = [
  {
    path: "/",
    element: <EmptyLayout />,
    children: [
      {
        path: "login",
        element: load(Login),
      },
    ],
  },
  {
    path: "/syt",
    element: <Layout />,
    children: [
      {
        path: "/syt/dashboard",
        meta: { icon: <HomeOutlined />, title: "首页" },
        element: load(Dashboard),
      },
      {
        path: "/syt/hospital",
        meta: { icon: <ShopOutlined />, title: "医院管理" },
        element: load(CompLayout),
        children: [
          {
            path: "/syt/hospital/hospitalSet",
            meta: { title: "医院设置" },
            element: load(HospitalSet),
          },
          {
            path: "/syt/hospital/hospitalSet/add",
            meta: { title: "添加医院" },
            element: load(HospitalSetAddOrUpdate),
            // 隐藏menu
            hidden: true
          },
          {
            path: "/syt/hospital/hospitalSet/edit/:id",
            meta: { title: "编辑医院" },
            element: load(HospitalSetAddOrUpdate),
            // 隐藏menu
            hidden: true
          },
          {
            path: "/syt/hospital/hospitalList",
            meta: { title: "医院列表" },
            element: load(HospitalList),
          },
          {
            path: "/syt/hospital/hospitalList/show/:id",
            meta: { title: "医院详情" },
            element: load(HospitalShow),
            // 隐藏menu
            hidden: true
          },
          {
            path: "/syt/hospital/hospitalList/schedule/:hoscode",
            meta: { title: "医院排班" },
            element: load(HospitalSchedule),
            // 隐藏menu
            hidden: true
          },
        ]
      },
    ],
  },

  {
    path: "/404",
    element: load(NotFound),
  },
  {
    path: "*",
    element: <Redirect to="/404" />,
  },
];

// 渲染路由
// 注意：首字母必须大写
export const RenderRoutes = () => {
  // react-router-dom的新增语法。不用自己遍历了，它帮我们遍历生成
  return useRoutes(routes);
};

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
  const currentIndex = routes.findIndex((route) => route.path === "/syt");
  return routes[currentIndex].children as XRoutes;
};

export default routes;