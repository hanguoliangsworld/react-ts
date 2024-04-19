import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as echarts from "echarts";
import useStore from "@/store";
import "./index.less";

const options = {
  xAxis: {
    type: "category",
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "30%"],
  },
  visualMap: {
    type: "piecewise",
    show: false,
    dimension: 0,
    seriesIndex: 0,
    pieces: [
      {
        gt: 1,
        lt: 3,
        color: "rgba(0, 0, 180, 0.4)",
      },
      {
        gt: 5,
        lt: 7,
        color: "rgba(0, 0, 180, 0.4)",
      },
    ],
  },
  series: [
    {
      type: "line",
      smooth: 0.6,
      symbol: "none",
      lineStyle: {
        color: "#5470C6",
        width: 5,
      },
      markLine: {
        symbol: ["none", "none"],
        label: { show: false },
        data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
      },
      areaStyle: {},
      data: [
        ["2019-10-10", 200],
        ["2019-10-11", 560],
        ["2019-10-12", 750],
        ["2019-10-13", 580],
        ["2019-10-14", 250],
        ["2019-10-15", 300],
        ["2019-10-16", 450],
        ["2019-10-17", 300],
        ["2019-10-18", 100],
      ],
    },
  ],
};
const Home = (props: any) => {
  const chartRef: any = useRef();
  const location = useLocation();
  const param = useParams();
  console.log("useLocation", location);
  console.log("useParams", param);

  const [size, setSize] = useState("12");

  const changeName = useStore((state: any) => state.changeName);
  const name = useStore((state: any) => state.name);

  useEffect(() => {
    setSize("30px");

    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chart = echarts.init(chartRef.current);
    // 设置图表实例的配置项和数据
    chart.setOption(options);
    // 组件卸载
    return () => {
      // myChart.dispose() 销毁实例。实例销毁后无法再被使用
      chart.dispose();
    };
  }, []);

  const getCss = () => {
    const ele: any = document.getElementById("about");
    var theCSSprop = window
      .getComputedStyle(ele, null)
      .getPropertyValue("font-size");
    console.log(theCSSprop);
  };

  const changeProjectName = () => {
    changeName("去巡山");
    console.log(name);
  };
  return (
    <div>
      <div
        id="about"
        className="box"
        style={{ fontSize: size, transition: "all 10s" }}>
        about
        <button onClick={getCss} className="box-button">
          获取字体大小
        </button>
      </div>
      <button onClick={changeProjectName} style={{ marginTop: "30px" }}>
        zustand 修改项目名称
      </button>
      <div style={{ width: "600px", height: "400px" }} ref={chartRef} />
    </div>
  );
};
export default Home;
