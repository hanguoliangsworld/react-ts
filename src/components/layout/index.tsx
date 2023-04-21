import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { LOCAL_STORAGE } from "@/config";
import Sidebar from "./slider";
import Header from "./header";
import "./index.less";

const { Content } = Layout;
const { SIDEBAR_COLLAPSED } = LOCAL_STORAGE;

const storageCollapsed = Number(
  localStorage.getItem(SIDEBAR_COLLAPSED) || true,
);

const HomeMainPage: React.FC = function () {
  const [collapsed, setCollapsed] = useState(!storageCollapsed);

  function handleToggleCollapsed() {
    setCollapsed(!collapsed);
    localStorage.setItem(SIDEBAR_COLLAPSED, Number(collapsed) + "");
  }
  return (
    <section className="home-main">
      <Layout>
        <Sidebar {...{ collapsed }} />
        <Layout className="home-layout">
          <Header {...{ collapsed, setCollapsed: handleToggleCollapsed }} />
          <Content id="container">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </section>
  );
};

export default HomeMainPage;
