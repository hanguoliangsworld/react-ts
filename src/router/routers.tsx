import React, { lazy } from "react";
import { HomeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import PrivateRoute from "@/components/privateRoute";
import Login from "@/pages/login";
import NoMatch from "@/pages/noFind";
import HomeIndex from "@/pages/home";
import CreateLog from "@/pages/log/createLog";
import LogDetail from "@/pages/log/logDetail";

const Base = lazy(() => import("@/pages/setting/base"));
const InnerMessage = lazy(() => import("@/pages/setting/base"));
const Notification = lazy(() => import("@/pages/setting/base"));
const Account = lazy(() => import("@/pages/setting/base"));

const _Login = (
  <PrivateRoute
    element={Login}
    meta={{
      title: "登录",
    }}
  />
);

export const MainRoutes = [
  {
    path: "/",
    element: _Login,
    title: "登陆",
    hideMenu: true, // 是否显示菜单栏
    isMenu: false, //是否是导航 显示在左侧
  },
  {
    path: "/login",
    element: _Login,
    title: "登陆",
    hideMenu: true,
    isMenu: false,
  },
  {
    path: "*",
    element: (
      <PrivateRoute
        element={NoMatch}
        meta={{
          requiresAuth: false,
          title: "404 Not Found",
        }}
      />
    ),
    title: "404 Not Found",
    hideMenu: true,
    isMenu: false,
  },
  {
    path: "home",
    element: (
      <PrivateRoute
        element={HomeIndex}
        meta={{
          requiresAuth: true,
        }}
      />
    ),
    icon: <HomeOutlined />,
    title: "首页",
    isMenu: true,
  },
  {
    path: "",
    element: (
      <PrivateRoute
        element={CreateLog}
        meta={{
          requiresAuth: true,
        }}
      />
    ),
    title: "日志管理",
    icon: <ClockCircleOutlined />,
    isMenu: true,
    children: [
      {
        path: "log/create",
        element: (
          <PrivateRoute
            element={CreateLog}
            meta={{
              requiresAuth: true,
            }}
          />
        ),
        title: "创建日志",
        isMenu: true,
      },
      {
        path: "log/detail",
        element: (
          <PrivateRoute
            element={LogDetail}
            meta={{
              requiresAuth: true,
            }}
          />
        ),
        title: "查看日志",
        isMenu: true,
      },
    ],
  },
];
