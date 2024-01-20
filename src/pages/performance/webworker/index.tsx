import { useEffect, useState } from "react";
import webWorker from "./worker";

const WebWorker = () => {
  const [list1, setList1] = useState<string[]>([]);
  const [list2, setList2] = useState<string[]>([]);
  useEffect(() => {
    const worker = new Worker(webWorker);
    console.log("——主线程执行——");
    worker.postMessage(new Array(30000).fill(1));
    worker.onmessage = (e) => {
      // 接收消息
      console.log("——web worker线程执行完毕——");
      setList1(e.data);
    };

    console.log("——主线程执行2——");
    const arr: string[] = [];
    new Array(20).fill(1).forEach((item: any, index: number) => {
      arr.push("item:" + index);
    });
    setList2(arr);
  }, []);
  return (
    <div style={{ overflowY: "auto" }}>
      <h1>主线程</h1>
      {list2.map((item) => (
        <div key={item}>{item}</div>
      ))}
      <h1>Web Worker线程</h1>
      {list1.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};
export default WebWorker;
