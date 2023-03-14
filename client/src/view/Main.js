import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
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
import Premium from "./Premium";
import SinglePremium from "./SinglePremium";
import Results from "./Results";
import ProfilePage from "./ProfilePage";
import SingleProfile from "./SingleProfile";

const Main = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/results" element={<Results />} />
          <Route path="actors" element={<ActorsPage />} />
          <Route path="/actors/:actorid" element={<SingleActor />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieid" element={<SingleMovie />} />
          <Route path="users" element={<Users />} />
          <Route path="/users/:userid" element={<SingleUser />} />
          <Route path="premiums" element={<Premium />} />
          <Route path="premiums/:premiumsid" element={<SinglePremium />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:Username" element={<SingleProfile />} />
          <Route path="*" element={<Err />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Main;
