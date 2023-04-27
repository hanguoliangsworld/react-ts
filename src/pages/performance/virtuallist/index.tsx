import { useState, useMemo } from "react";
import { flushSync } from "react-dom";

const itemHeight = 30; // 列表项高度
const containerHeight = 600; // 容器高度
const total = 1000; // 数据总条数
const contentHeight = total * (itemHeight + 1); // 总内容高度
const paddingCount = 5; // 误差
const Virtuallist = () => {
  const [scrollTop, setScrollTop] = useState(0); // 滚动位置

  // 继续需要渲染的 item 索引有哪些
  let startIdx = useMemo(() => Math.floor(scrollTop / itemHeight), [scrollTop]);
  let endIdx = useMemo(
    () => Math.floor((scrollTop + containerHeight) / itemHeight),
    [scrollTop],
  );

  startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
  endIdx = Math.min(endIdx + paddingCount, total - 1);

  console.log(startIdx, endIdx, 1111122);
  const innerBeforeHeight = useMemo(() => itemHeight * startIdx, [startIdx]);

  const items = [];
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(
      <div
        key={i}
        style={{
          backgroundColor: "#ccc",
          height: itemHeight + "px",
          textAlign: "center",
          lineHeight: itemHeight + "px",
          borderBottom: "1px solid #fff",
        }}>
        {i + 1}
      </div>,
    );
  }
  const handleScroll = (e: any) => {
    setScrollTop(e.target.scrollTop);
    // 同步更新
    /* flushSync(() => {
      setScrollTop(e.target.scrollTop);
    }); */
  };

  return (
    <div
      style={{
        overflowY: "auto",
        height: containerHeight + "px",
        border: "1px solid red",
      }}
      onScroll={handleScroll}>
      <div style={{ height: innerBeforeHeight }} />
      {items}
    </div>
  );
};
export default Virtuallist;
