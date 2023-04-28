import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import img1 from "@/assets/images/img1.png";
import img2 from "@/assets/images/img2.png";
import img3 from "@/assets/images/img3.png";
import img4 from "@/assets/images/img4.png";
import img5 from "@/assets/images/img5.png";
import img6 from "@/assets/images/img6.png";

const LazyImag = () => {
  return (
    <div id="box" style={{ overflowY: "auto" }}>
      <LazyLoadImage src={img1} width={600} height={400} alt="Image Alt" />
      <LazyLoadImage src={img2} width={600} height={400} alt="Image Alt" />
      <LazyLoadImage src={img3} width={600} height={400} alt="Image Alt" />
      <LazyLoadImage src={img4} width={600} height={400} alt="Image Alt" />
      <LazyLoadImage src={img5} width={600} height={400} alt="Image Alt" />
      <LazyLoadImage src={img6} width={600} height={400} alt="Image Alt" />
    </div>
  );
};
export default LazyImag;
