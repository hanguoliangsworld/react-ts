import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Log = (props: any) => {
  const location = useLocation();
  const param = useParams();
  console.log("useLocation", location);
  console.log("useParams", param);
  return <div>setting</div>;
};
export default Log;
