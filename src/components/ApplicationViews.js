// this module works in tandem with the NavBar
// the "Routes" are listening for an event
import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { RestaurantList } from "./restaurants/RestaurantList";

// purpose of this component is to render the individual pages that were selected by navBar
// links, click on the links and the following gets triggered.

export const ApplicationViews = () => {
  return (
    <>
      <Route path="/restaurants">
        <RestaurantList />
      </Route>
    </>
  );
};
