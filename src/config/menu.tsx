import React from "react";
import {
  HomeOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  ScheduleOutlined,
  BarChartOutlined,
  FormOutlined,
  UserOutlined,
  InsertRowLeftOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

export const HOME_SIDER_MENU_LIST = [
  {
    path: "/index",
    icon: <HomeOutlined />,
    name: "后台首页",
  },
  {
    path: "/reminder",
    icon: <ClockCircleOutlined />,
    name: "提醒事项",
  },
  {
    path: "/todoList",
    icon: <FileDoneOutlined />,
    name: "活动清单",
  },
  {
    path: "/todayTask",
    icon: <ScheduleOutlined />,
    name: "今日待办",
  },
  {
    path: "/log",
    icon: <SnippetsOutlined />,
    name: "日志管理",
  },
  {
    path: "/company",
    icon: <InsertRowLeftOutlined />,
    name: "公司单位",
  },
  {
    path: "",
    icon: <BarChartOutlined />,
    name: "财务管理",
    children: [
      {
        path: "/capitalFlow",
        name: "资金流动",
      },
      {
        path: "/capitalFlow/type",
        name: "创建类别",
      },
    ],
  },
  {
    path: "",
    icon: <FormOutlined />,
    name: "我的备忘",
    children: [
      {
        path: "/memorandum",
        name: "备忘录列表",
      },
      {
        path: "/memorandum/create",
        name: "备忘录创建",
      },
    ],
  },
  {
    path: "/setting/base",
    icon: <UserOutlined />,
    name: "个人中心",
  },
];

export const SETTING_SIDER_MENU_LIST = [
  {
    path: "/setting/base",
    name: "个人中心",
  },
  {
    path: "/setting/innerMessage",
    name: "消息中心",
  },
  {
    path: "/setting/notification",
    name: "消息通知",
  },
  {
    path: "/home/setting/account",
    name: "账号设置",
  },
];
