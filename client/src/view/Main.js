import React from "react";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../comps/Header";
import Err from "./Err";
import Footer from "../comps/Footer";
import ActorsPage from "./ActorsPage";
import MoviesPage from "./MoviesPage";
import SingleMovie from "./SingleMovie";
import Login from "./Login";
import Register from "./Register.js";
import SingleActor from "./SingleActor";
import Users from "./Users";
import SingleUser from "./SingleUser";
const Main = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Err />} />
          <Route path="actors" element={<ActorsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieid" element={<SingleMovie />} />
          <Route path="/actors/:actorid" element={<SingleActor />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element={<Users />} />
          <Route path="/users/:userid" element={<SingleUser />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Main;
