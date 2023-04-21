/* eslint-disable no-restricted-globals */
const workercode = () => {
  self.onmessage = function (e) {
    console.log(44444);
    const result = [...e.data];
    const arr: string[] = [];
    result.forEach((item: any, index: number) => {
      arr.push("item:" + index);
    });
    self.postMessage(arr);
  };
};
// 把脚本代码转为string
let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
