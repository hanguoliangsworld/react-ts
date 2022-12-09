import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Home = (props: any) => {
  const location = useLocation();
  const param = useParams();
  console.log("useLocation", location);
  console.log("useParams", param);
  return <div>demo2</div>;
};
export default Home;
