import React from "react";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../comps/Header";
import Err from "./Err";
import Footer from "../comps/Footer";
const Main = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Err />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Main;
