import WebpImage from "@/components/WebpImage";
import Imgsrc from "@/assets/images/26.jpg";
import Imgsrc2 from "@/assets/images/26.webp";

const Picture = () => {
  return (
    <div style={{ overflowY: "auto" }}>
      <h1>iconfont</h1>
      <span className="iconfont" style={{ color: "#f4ea2a", fontSize: "30px" }}>
        &#xe83b;
      </span>
      <span className="iconfont" style={{ color: "#1296db", fontSize: "30px" }}>
        &#xe83c;
      </span>
      <span className="iconfont" style={{ color: "#f4ea2a", fontSize: "30px" }}>
        &#xe83e;
      </span>

      <h1>webp</h1>
      <img src={Imgsrc + "?t=209"} style={{ width: "600px" }} />
      <WebpImage src={Imgsrc} style={{ width: "600px" }} />
      <WebpImage src={Imgsrc2} style={{ width: "600px" }} />
      {/* {list &&
        list.map((item: string, index: number) => (
          <div key={index}>{item}</div>
        ))} */}
    </div>
  );
};
export default Picture;
