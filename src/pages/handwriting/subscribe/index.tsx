import EventEmitter from "@/utils/eventEmitter";

const Subscrible = () => {
  // 发布订阅
  const changeName = () => {
    EventEmitter.emit("name", "庄子0001" + Math.random());

    const sum = add(1, 2)(3, 3, 3)();
    console.log(sum);
  };
  // 柯里化
  const add = (...arg: any) => {
    let a = [...arg];
    let _add = function (...innerArg: any) {
      if (innerArg.length === 0) {
        return a.reduce(function (a, b) {
          return a + b;
        });
      } else {
        [].push.apply(a, innerArg);
        return _add;
      }
    };
    return _add;
  };
  return (
    <div>
      <button onClick={changeName}>修改名称</button>
    </div>
  );
};
export default Subscrible;
