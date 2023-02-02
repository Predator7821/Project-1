import React from "react";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../comps/Header";
import Err from "./Err";
import Footer from "../comps/Footer";
import ActorsPage from "./ActorsPage";
import MoviesPage from "./MoviesPage";
import SingleMovie from "./SingleMovie";
const Main = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Err />} />
          <Route path="actors" element={<ActorsPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieid" element={<SingleMovie />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Main;
