import { useState } from "react";

const Page = () => {
  const [list, setList] = useState([]);

  const getList = () => {
    // 记录任务开始时间
    let now = Date.now();

    const arr: any = new Array(50000).fill(0);
    setList(arr);

    console.log("JS运行时间：", Date.now() - now);
    setTimeout(() => {
      console.log("总运行时间：", Date.now() - now);
    }, 0);
  };
  return (
    <div style={{ overflow: "auto", height: "600px", border: "1px solid red" }}>
      <button onClick={getList}>请求5万条数据</button>
      {list.map((item, index) => (
        <div key={index}>{"item" + index}</div>
      ))}
    </div>
  );
};
export default Page;
