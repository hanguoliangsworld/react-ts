import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./index.css";

const Home = (props: any) => {
  const location = useLocation();
  const param = useParams();
  console.log("useLocation", location);
  console.log("useParams", param);

  const [size, setSize] = useState("12");
  useEffect(() => {
    setSize("30px");
  }, []);
  const getCss = () => {
    const ele: any = document.getElementById("about");
    var theCSSprop = window
      .getComputedStyle(ele, null)
      .getPropertyValue("font-size");
    console.log(theCSSprop);
  };
  return (
    <div
      id="about"
      className="box"
      style={{ fontSize: size, transition: "all 10s" }}>
      about
      <button onClick={getCss} className="box-button">
        获取
      </button>
    </div>
  );
};
export default Home;
