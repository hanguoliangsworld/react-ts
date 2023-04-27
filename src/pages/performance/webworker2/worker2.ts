/* eslint-disable no-restricted-globals */
const workercode = () => {
  self.onmessage = function (e) {
    for (var i = 0; i < 100000; i++) {
      for (var j = 0; j < 100000; j++) {}
    }
    self.postMessage("worker2");
  };
};
// 把脚本代码转为string
let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
