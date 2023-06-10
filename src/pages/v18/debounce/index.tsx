import React, { useRef } from "react";
import debounce from "lodash/debounce";

/* export default class Test extends React.Component {
  handleOnEmit = () => {
    console.log("点击了");
  };
  render() {
    return (
      <button onClick={debounce(this.handleOnEmit, 200)}>
        连续点击，查看执行情况
      </button>
    );
  }
} */

const Test = () => {
  const handleOnEmit = (e: any) => {
    console.log("点击了", e);
  };
  const handleOnClick = useRef(debounce((e) => handleOnEmit(e), 200)).current;
  return <button onClick={handleOnClick}>连续点击，查看执行情况</button>;
};
export default Test;
