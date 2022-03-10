import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

// this component makes the buttons will provide a visual path that will trigger
// the rendering of components in Application Views
// what do we want each button to say and where we want to direct it

export const NavBar = (props) => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/restaurants">
          Restaurants
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to="/favorites">
          Favorites
        </Link>
      </li>

      <li className="navbar__item">
        <Link
          className="navbar__link"
          to="/#"
          onClick={() => {
            localStorage.removeItem("vegan_user");
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};
