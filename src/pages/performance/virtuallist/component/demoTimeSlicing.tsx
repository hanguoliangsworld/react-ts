import React from "react";

const num = 100;
export default class App extends React.Component {
  state = {
    list: [],
  };

  handerClick = () => {
    this.sliceTime(new Array(100000).fill(0), 0);
  };

  sliceTime = (list: any, start: number) => {
    let size = list.length;
    if (start >= size) return;

    /* setTimeout(() => {
      const newList = list.slice(start, start + num);
      start += num;
      this.setState({
        list: this.state.list.concat(newList),
      });
      this.sliceTime(list, start);
    }, 0); */

    window.requestAnimationFrame(() => {
      const newList = list.slice(start, start + num);
      start += num;
      this.setState({
        list: this.state.list.concat(newList),
      });
      this.sliceTime(list, start);
    });
  };

  render() {
    const { list } = this.state;
    console.log(list);
    return (
      <>
        <button onClick={this.handerClick}>请求10万条数据</button>
        <div
          style={{
            height: "500px",
            overflowY: "auto",
            border: "1px solid red",
          }}>
          {list.map((item, index) => (
            <li key={index}>item{index}</li>
          ))}
        </div>
      </>
    );
  }
}
