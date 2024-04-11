// @ts-nocheck
class MyPromise {
  constructor(executor) {
    this.status = "pending";
    this.value = null;
    this.reason = null;
    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
      }
    };
    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected?) {
    if (this.status === "fulfilled") {
      onFulfilled(this.value);
    }
    if (this.status === "rejected") {
      onRejected && onRejected(this.reason);
    }
  }
}

export default MyPromise;
