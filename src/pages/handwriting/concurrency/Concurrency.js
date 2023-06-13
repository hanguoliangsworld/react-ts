const Concurrency = (requestList, max) => {
  const taskQueue = [];

  const request = (task) => {
    return new Promise((resolve, reject) => {
      console.log(task.name + " 开始执行");
      setTimeout(() => {
        resolve(task.name);
      }, task.delay);
    });
  };
  const run = (task) => {
    const fetc = request(task);
    taskQueue.push(JSON.stringify(task));
    fetc
      .then((res) => {
        console.log(res + " 执行结束");
      })
      .finally(() => {
        taskQueue.splice(taskQueue.indexOf(JSON.stringify(task)), 1);
        const nextTask = requestList.shift();
        if (nextTask) run(nextTask);
      });
  };

  while (taskQueue.length < max) {
    let request = requestList.shift();
    run(request);
  }
};
export default Concurrency;
