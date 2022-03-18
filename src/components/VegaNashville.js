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
                <div className="header">
                  <h1 className="title">VegaNashville</h1>
                  {/* <img
                    className="header_photo"
                    src="/images/dining.jpg"
                    alt="people dining outdoors"
                  /> */}
                </div>
                <h5>Be apart of Music City's growing plant-based community</h5>
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
