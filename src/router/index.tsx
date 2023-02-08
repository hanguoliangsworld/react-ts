import React from "react";
import { MainRoutes } from "./routers";
import { BrowserRouter, useRoutes } from "react-router-dom";
import MainEntry from "@/components/layout";
import { RouterProps } from "@/config/interface";

function App() {
  const routers: RouterProps[] = [];
  const sliderRoters: RouterProps[] = [];
  MainRoutes.forEach((item) => {
    const { hideMenu, path, element, children } = item;
    if (!hideMenu) {
      if (children) {
        children.forEach((r) => {
          sliderRoters.push({ path: r.path, element: r.element });
        });
      } else {
        sliderRoters.push({ path, element });
      }
    } else {
      routers.push({ path, element });
    }
  });
  routers.push({
    path: "",
    element: <MainEntry />,
    children: sliderRoters,
  });

  const MRoutes = () => useRoutes(routers);
  return (
    <BrowserRouter>
      <MRoutes />
    </BrowserRouter>
  );
}

export default App;
