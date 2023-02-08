import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { CONFIG } from "@/config";

type Props = {
  element: React.FC | React.ComponentClass;
  meta?: Record<string, any>;
};

const o = Object.create(null);

const PrivateRoute: React.FC<Props> = function ({
  element: Component,
  meta = o,
  ...rest
}) {
  const { pathname, search } = useLocation();
  const isLogin = true;
  const isLoginPage = pathname === "/" || pathname === "/login";

  React.useEffect(() => {
    if (meta.title) {
      document.title = `${meta.title} - ${CONFIG.title}`;
    } else {
      document.title = CONFIG.title;
    }
  }, [meta]);

  if (isLoginPage && isLogin) {
    //const redirectUrl = JSON.parse(search).redirectUrl as string;
    const url = "/home" + search;
    return <Navigate to={url} replace />;
  }

  if (meta.requiresAuth) {
    if (isLogin) {
      return <Component {...rest} />;
    } else {
      if (!isLoginPage) {
        return <Navigate to={`/?redirectUrl=${pathname}${search}`} replace />;
      }
    }
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
