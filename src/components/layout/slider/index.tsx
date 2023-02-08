import React, { useEffect, useState, useMemo } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeMainState, RouterProps } from "@/config/interface";
import { CONFIG } from "@/config";
import { MainRoutes } from "@/router/routers";
import logoImage from "@/assets/images/logo.png";
import "./index.less";

const { Sider } = Layout;

type Props = HomeMainState;

const Sidebar: React.FC<Props> = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  function handleOpenChange(openKeys: any) {
    setOpenKeys(openKeys);
  }
  const meunList = useMemo(() => {
    const list: RouterProps[] = [];
    MainRoutes.forEach((item) => {
      const { isMenu } = item;
      if (isMenu) {
        list.push(item);
      }
    });
    return list;
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    const fragment = pathname.split("/").slice(0, 3);
    const prefixPath = fragment.join("/");
    if (fragment.length === 3) {
      for (let i = 0; i < meunList.length; i++) {
        const menu = meunList[i];
        if (Array.isArray(menu.children)) {
          const findIdx = menu.children.findIndex(
            (menu) => pathname === menu.path,
          );
          if (findIdx !== -1) {
            setSelectedKeys(menu.children[findIdx].path);
            setOpenKeys([menu.title || ""]);
            break;
          }
        }
        if (menu.path.indexOf(prefixPath) !== -1) {
          setSelectedKeys(menu.path);
          break;
        }
      }
    }
  }, [location.pathname, meunList]);

  const items: MenuProps["items"] = useMemo(() => {
    return meunList.map((item) => {
      const data: any = {
        key: item.path || item.title,
        icon: item.icon,
        label: item.title,
      };
      if (Array.isArray(item.children)) {
        data.children = item.children.map(
          (menu) =>
            menu.isMenu && {
              key: menu.path,
              label: menu.title,
            },
        );
      }
      return data;
    });
  }, [meunList]);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={190}
      className="sidebar">
      <div className="sider-menu-logo">
        {collapsed ? <img src={logoImage} alt="" /> : CONFIG.title}
      </div>

      <Menu
        selectedKeys={[selectedKeys]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        onClick={onClick}
        mode="inline"
        theme="dark"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
