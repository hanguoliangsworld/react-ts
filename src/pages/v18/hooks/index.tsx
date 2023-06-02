import React, { useState, useCallback, useMemo } from "react";
import Child from "./child";

const Hooks = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    let newCount = count;
    setCount(newCount + 1);
  };

  const getOthers = useMemo(() => {
    console.log("others更新了");
    return new Array(10).fill(0);
  }, []);

  const onhandleUpdate = useCallback((data: number) => {
    console.log("子组件触发", data);
  }, []);
  return (
    <div>
      <h3>useMemo、useCallback、memo</h3>
      <div>count:{count}</div>
      <div>其他数据：{getOthers}</div>
      <button onClick={addCount}>增加count</button>
      <Child onhandleUpdate={onhandleUpdate} />
    </div>
  );
};
export default Hooks;
