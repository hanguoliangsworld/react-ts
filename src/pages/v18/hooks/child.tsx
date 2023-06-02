import React, { FC } from "react";

interface IChildProps {
  onhandleUpdate: (n: number) => void;
}
const Child: FC<IChildProps> = ({ onhandleUpdate }) => {
  console.log("子元素更新了");
  return (
    <div>
      我是子元素<button onClick={() => onhandleUpdate(222)}>点击子组件</button>
    </div>
  );
};
export default React.memo(Child);
