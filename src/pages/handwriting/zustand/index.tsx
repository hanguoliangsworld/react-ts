import { useMemo, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";
import useStore from "@/store";
import Child from "./child";

const Page = () => {
  const { count } = useStore((state: any) => ({
    count: state.count,
  }));
  console.log(count);

  useEffect(() => {
    let userTopic = "/av/u/AY1723693430481D2weXONzweZlLJZLB4loysceemn2NB";
    const username = `web_"AY17237005265046oFS7ZLDK7SVxVhQA3ReDgKuV3cbZB"`;
    const password = "33842411062325938a6c988b5a1cb63e";
    const url = "m1-cn.wgine.com:443/mqtt";
    const socket = mqtt.connect(`wss://${username}:${password}@${url}`, {
      username,
      password: password,
      keepalive: 60,
      clientId: username,
    });

    console.log("socket = ", socket);
    socket.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log("11", data);
      } catch (error) {
        console.log("error:", error);
      }
    });
    socket.subscribe(userTopic, { qos: 1 }, (error) => {
      if (error) {
        console.log("mqtt subscribe error: ", error);
      }
    });
  }, []);

  const num = useMemo(() => {
    return count;
  }, [count]);
  return (
    <div>
      count: {num}
      <Child />
    </div>
  );
};

export default Page;
