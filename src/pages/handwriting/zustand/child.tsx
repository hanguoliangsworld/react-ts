import { useEffect } from "react";
import useStore from "@/store";

const Page = () => {
  const { increment } = useStore((state: any) => ({
    increment: state.increment,
  }));

  useEffect(() => {
    setTimeout(() => {
      increment();
    }, 2000);
  }, []);

  return (
    <div>
      <button onClick={increment}>increment</button>
    </div>
  );
};

export default Page;
