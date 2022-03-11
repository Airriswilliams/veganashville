// this module works in tandem with the NavBar
// the "Routes" are listening for an event
import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { RestaurantList } from "./restaurants/RestaurantList";
import { RestaurantForm } from "./restaurants/RestaurantForm";
import { Restaurant } from "./restaurants/Restaurant";

// purpose of this component is to render the individual pages that were selected by navBar
// links, click on the links and the following gets triggered.

export const ApplicationViews = () => {
  return (
    <>
      <Route path="/restaurants">
        <RestaurantList />
      </Route>

      <Route path="/restaurants/create">
        <RestaurantForm />
      </Route>

      <Route exact path="/restaurants/:restaurantId(\d+)">
        <Restaurant />
      </Route>
    </>
  );
};
