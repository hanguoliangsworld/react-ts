import { useEffect } from "react";
import webWorker1 from "./worker1";
import webWorker2 from "./worker2";

const WebWorker2 = () => {
  const consoleTime = (start: number, message: string) => {
    console.log((new Date().getTime() - start) / 1000 + "s", message);
  };
  useEffect(() => {
    const S = new Date().getTime();
    console.log("start");
    setTimeout(() => {
      for (var i = 0; i < 100000; i++) {
        for (var j = 0; j < 100000; j++) {}
      }
    }, 1000);
    setTimeout(() => consoleTime(S, "timeOut1"), 1000);
    setTimeout(() => {
      for (var i = 0; i < 100000; i++) {
        for (var j = 0; j < 100000; j++) {}
      }
    }, 1000);
    setTimeout(() => consoleTime(S, "timeOut2"), 1000);
    console.log("end");

    /* console.log("start");
    const worker1 = new Worker(webWorker1);
    const worker2 = new Worker(webWorker2);
    worker1.postMessage({});
    worker1.onmessage = (e) => {
      consoleTime(S, e.data);
    };
    worker2.postMessage({});
    worker2.onmessage = (e) => {
      consoleTime(S, e.data);
    };
    console.log("end"); */
  }, []);
  return (
    <div style={{ overflowY: "auto" }}>
      <h1>Web Worker和setTimeout</h1>
    </div>
  );
};
export default WebWorker2;
