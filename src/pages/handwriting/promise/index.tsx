// @ts-nocheck
import React from "react";
import MyPromise from "./pomise";

const PromiseElement = () => {
  const handlePromise = () => {
    const p1 = new MyPromise((resolve, reject) => {
      resolve("hello");
    });
    p1.then((result) => {
      console.log(result, 111);
    });
  };
  return <button onClick={handlePromise}>执行Promise</button>;
};

export default PromiseElement;
