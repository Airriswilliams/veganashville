import React from "react";
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./VegaNashville.css";

export const VegaNashville = () => {
  return (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("vegan_user")) {
            return (
              <>
                <NavBar />
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />{" "}
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>{" "}
    </>
  );
};
