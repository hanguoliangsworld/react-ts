import { useEffect, useState } from "react";
import WebpImage from "@/components/WebpImage";
import Imgsrc from "@/assets/images/26.jpg";
import webWorker from "./webWorker";

const Home = () => {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
    const worker = new Worker(webWorker);
    console.log(11111);
    worker.onmessage = (e) => {
      // 接收消息
      console.log(33333);
      setList(e.data);
    };

    worker.postMessage(new Array(30000).fill(1));
    console.log(2222);
    /* const arr: string[] = [];
    new Array(10000).fill(1).forEach((item: any, index: number) => {
      arr.push("item:" + index);
    });
    setList(arr); */
  }, []);
  console.log(list, 11121212);
  return (
    <div style={{ overflowY: "auto" }}>
      <p>createlog</p>
      <span className="iconfont" style={{ color: "#f4ea2a", fontSize: "30px" }}>
        &#xe83b;
      </span>
      <span className="iconfont" style={{ color: "#1296db", fontSize: "30px" }}>
        &#xe83c;
      </span>
      <span className="iconfont" style={{ color: "#f4ea2a", fontSize: "30px" }}>
        &#xe83e;
      </span>
      <img src={Imgsrc} style={{ width: "600px" }} />
      <WebpImage src={Imgsrc} style={{ width: "600px" }} />
      {/* {list &&
        list.map((item: string, index: number) => (
          <div key={index}>{item}</div>
        ))} */}
    </div>
  );
};
export default Home;
