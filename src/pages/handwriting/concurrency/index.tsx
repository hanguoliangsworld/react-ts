import React from "react";
import ConcurrencyRequest from "./Concurrency";

const Conency = () => {
  const request = [
    { name: "任务1", delay: 1000 },
    { name: "任务2", delay: 2000 },
    { name: "任务3", delay: 1000 },
    { name: "任务4", delay: 3000 },
    { name: "任务5", delay: 2000 },
    { name: "任务6", delay: 1000 },
    { name: "任务7", delay: 2000 },
    { name: "任务8", delay: 2000 },
    { name: "任务9", delay: 2000 },
  ];

  return (
    <div>
      <button onClick={() => ConcurrencyRequest(request, 6)}>发起请求</button>
    </div>
  );
};
export default React.memo(Conency);
