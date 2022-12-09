import React from "react";
import { Link } from "react-router-dom";

const Home = (props: any) => {
  return (
    <div>
      <p>Home</p>
      <div>
        <Link to="/demo?id=xiaoxiao">to demo</Link>
      </div>
      <div>
        <Link to="/about/sansan/man">to about</Link>
      </div>
    </div>
  );
};
export default Home;
