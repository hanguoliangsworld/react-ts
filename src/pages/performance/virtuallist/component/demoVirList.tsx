import { useState } from "react";

const itemHeight = 30; // 列表项高度
const containerHeight = 600; // 容器高度
const total = 100000; // 数据总条数
const paddingCount = 2; // 误差

const Virtuallist = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(
    Math.floor(containerHeight / itemHeight),
  );

  const getVirtualContentTop = () => {
    return itemHeight * startIdx;
  };

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;

    let startIdx = Math.floor(scrollTop / itemHeight);
    let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight);

    startIdx = Math.max(startIdx - paddingCount, 0);
    endIdx = Math.min(endIdx + paddingCount, total);

    setStartIdx(startIdx);
    setEndIdx(endIdx);
  };

  return (
    <div
      style={{
        overflowY: "auto",
        height: containerHeight + "px",
        border: "1px solid red",
      }}
      onScroll={handleScroll}>
      <div style={{ height: getVirtualContentTop() }} />
      <div>
        {Array.from({ length: endIdx - startIdx })
          .fill(1)
          .map((_v, i) => {
            const currentIndex = startIdx + i;
            return (
              <div
                key={currentIndex}
                style={{
                  backgroundColor: "#ccc",
                  height: itemHeight + "px",
                  textAlign: "center",
                  lineHeight: itemHeight + "px",
                  borderBottom: "1px solid #fff",
                }}>
                {currentIndex}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Virtuallist;
