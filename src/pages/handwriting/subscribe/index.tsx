// @ts-nocheck
import EventEmitter from "@/utils/eventEmitter";

const Subscrible = () => {
  // 发布订阅
  const changeName = () => {
    EventEmitter.emit("name", "庄子0001" + Math.random());
  };
  // 柯里化
  /* const add = (...arg: any) => {
    let a = [...arg];
    let _add = function (...innerArg: any) {
      if (innerArg.length === 0) {
        return a.reduce(function (a1, b1) {
          return a1 + b1;
        });
      } else {
        [].push.apply(a, innerArg);
        return _add;
      }
    };
    return _add;
  };
  const currys = () => {
    console.log(add(1, 2, 9)(3, 3, 3)(8)());
  }; */

  /* function currying(fun, ...a) {
    const _this = this;
    const initArgs = [...a];
    const len = fun.length; // 被改造函数参数的个数
    return function () {
      let _args = [...initArgs, ...arguments]; // 参数
      // 如果参数个数小于最初的fun.length，则递归调用，继续收集参数
      if (_args.length < len) {
        return currying.apply(_this, [fun, ..._args]);
      }
      // 参数收集完毕，则执行函数，返回结果
      return fun.apply(this, _args);
    };
  }
  // 使用
  const fn = function (a, b) {
    return a + b;
  }; */

  function currying(...a) {
    let p = [...a];
    function newFun(...b) {
      const bs = [...b];
      if (bs.length > 0) {
        // [].push.apply(p, bs);
        p = p.concat([...b]);
        return newFun;
      } else {
        return p.reduce((prv, item) => {
          return prv + item;
        });
      }
    }
    return newFun;
  }
  const currys = () => {
    console.log(currying(2, 8)(2, 6)()); // 6
  };

  return (
    <div>
      <button onClick={changeName}>修改名称</button>
      <button onClick={currys}>柯里化</button>
    </div>
  );
};
export default Subscrible;
