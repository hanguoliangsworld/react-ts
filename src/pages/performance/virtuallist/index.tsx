import DemoList from "./component/demoList";
import DemoTimeSlicing from "./component/demoTimeSlicing";
import DemoVirlist from "./component/demoVirList";
import DemoDynamic from "./component/demoDynamic";

const Virtuallist = () => {
  return (
    <div>
      {/* 渲染时间 */}
      {/* <DemoList /> */}

      {/* 时间切片 */}
      {/* <DemoTimeSlicing /> */}

      {/* 虚拟列表-固定高度 */}
      {/* <DemoVirlist /> */}

      {/* 虚拟列表-高度未知 */}
      <DemoDynamic />
    </div>
  );
};
export default Virtuallist;
