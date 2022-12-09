import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/pages/home";
import Demo from "@/pages/demo";
import About from "@/pages/about";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/about/:age/:sex" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
