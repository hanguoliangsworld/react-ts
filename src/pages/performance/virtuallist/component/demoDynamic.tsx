import { useState, useMemo, useRef, useEffect } from "react";
import faker from "faker";

const containerHeight = 600; // 容器高度
const total = 100000; // 数据总条数
const paddingCount = 2; // 误差
const presetItemHeight = 40; //预设高度
const itemSize = 30; // 渲染的条数

const datas = new Array(total).fill(1).map((item, index) => {
  return {
    title: index + ": " + faker.lorem.sentences(),
    index: index,
  };
});

let cacheContentHeight = [] as Array<number>;

const DemoDynamic = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(itemSize);

  const List: any = useRef(null);

  useEffect(() => {
    updateCache();
  }, []);

  const updateCache = () => {
    //更新缓存高度
    //获取已更新的节点，并获取其高度并将其相加到总高度中
    const nodes: NodeListOf<any> = List.current?.childNodes || ([] as any);
    nodes.forEach((node: HTMLDivElement) => {
      if (!node) {
        return;
      }
      const index = Number(node.dataset.index);
      const { height = presetItemHeight } = node.getBoundingClientRect();

      cacheContentHeight[index] = height;
    });
  };

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    let num = 0;
    let heightCount = 0;
    for (let index = 0; index < cacheContentHeight.length; index++) {
      heightCount += cacheContentHeight[index];
      if (heightCount > scrollTop) {
        num = index;
        break;
      }
    }
    if (num < total) {
      setStartIdx(Math.max(num - paddingCount, 0));
      setEndIdx(Math.min(itemSize + num + paddingCount, total));
      updateCache();
    }
  };

  const getVirtualContentTop = () => {
    let top = 0;
    const newCache = Array.from(cacheContentHeight);
    newCache.length = startIdx;
    if (newCache.length > 1) {
      top = newCache.reduce((v, v2) => v + v2);
    } else {
      top = newCache[0];
    }
    return startIdx === 0 ? 0 : top;
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
      <div ref={List}>
        {Array.from({ length: endIdx - startIdx }).map((_v, i) => {
          const currentIndex = startIdx + i;
          return (
            <div
              key={datas[currentIndex]?.index}
              data-index={datas[currentIndex]?.index}
              style={{
                backgroundColor: "#ccc",
                textAlign: "center",
                borderBottom: "1px solid #fff",
              }}>
              {datas[currentIndex].title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DemoDynamic;
