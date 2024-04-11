import DemoList from "./component/demoList";
import DemoSplit from "./component/demoSplit";
import DemoVirlist from "./component/demoVirList";
import DemoDynamic from "./component/demoDynamic";

const Virtuallist = () => {
  return (
    <div>
      {/* 渲染时间 */}
      {/* <DemoList /> */}

      {/* 时间分片 */}
      {/* <DemoSplit /> */}

      {/* 虚拟列表-固定高度 */}
      {/* <DemoVirlist /> */}

      {/* 虚拟列表-高度未知 */}
      <DemoDynamic />
    </div>
  );
};
export default Virtuallist;
