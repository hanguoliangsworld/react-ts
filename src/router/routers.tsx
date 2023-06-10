import React, { lazy } from "react";
import { HomeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import PrivateRoute from "@/components/privateRoute";
import Login from "@/pages/login";
import NoMatch from "@/pages/noFind";
import HomeIndex from "@/pages/home";
import Picture from "@/pages/performance/picture";
import Virtuallist from "@/pages/performance/virtuallist";
import Webworker from "@/pages/performance/webworker";
import Webworker2 from "@/pages/performance/webworker2";
import LazyImg from "@/pages/lazy/img/index";
import Hooks from "@/pages/v18/hooks";
import Debounce from "@/pages/v18/debounce";

/* const Base = lazy(() => import("@/pages/setting/base"));
const InnerMessage = lazy(() => import("@/pages/setting/base"));
const Notification = lazy(() => import("@/pages/setting/base"));
const Account = lazy(() => import("@/pages/setting/base")); */

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
    path: "performance",
    title: "性能优化",
    icon: <ClockCircleOutlined />,
    isMenu: true,
    children: [
      {
        path: "performance/picture",
        element: (
          <PrivateRoute
            element={Picture}
            meta={{
              requiresAuth: true,
            }}
          />
        ),
        title: "图片加载",
        isMenu: true,
      },
      {
        path: "performance/virtuallist",
        element: (
          <PrivateRoute
            element={Virtuallist}
            meta={{
              requiresAuth: true,
            }}
          />
        ),
        title: "虚拟列表",
        isMenu: true,
      },
      {
        path: "performance/webworker",
        element: (
          <PrivateRoute
            element={Webworker}
            meta={{
              requiresAuth: true,
            }}
          />
        ),
        title: "Web Worker",
        isMenu: true,
      },
      {
        path: "performance/webworker2",
        element: (
          <PrivateRoute
            element={Webworker2}
            meta={{
              requiresAuth: true,
            }}
          />
        ),
        title: "Web Worker2",
        isMenu: true,
      },
    ],
  },
  {
    path: "lazy",
    title: "懒加载",
    icon: <ClockCircleOutlined />,
    isMenu: true,
    children: [
      {
        path: "lazy/img",
        element: (
          <PrivateRoute
            element={LazyImg}
            meta={{
              requiresAuth: true,
            }}
          />
        ),
        title: "图片懒加载",
        isMenu: true,
      },
    ],
  },
  {
    path: "v18",
    title: "React V18",
    icon: <ClockCircleOutlined />,
    isMenu: true,
    children: [
      {
        path: "V18/hooks",
        element: (
          <PrivateRoute
            element={Hooks}
            meta={{
              requiresAuth: true,
            }}
          />
        ),
        title: "hooks",
        isMenu: true,
      },
      {
        path: "V18/debounce",
        element: (
          <PrivateRoute
            element={Debounce}
            meta={{
              requiresAuth: true,
            }}
          />
        ),
        title: "debounce",
        isMenu: true,
      },
    ],
  },
];
