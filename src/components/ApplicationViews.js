// this module works in tandem with the NavBar
// the "Routes" are listening for an event
import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { RestaurantList } from "./restaurants/RestaurantList";
import { RestaurantForm } from "./restaurants/RestaurantForm";
import { Restaurant } from "./restaurants/Restaurant";
import { ReviewForm } from "./reviews/ReviewForm";
import { ReviewList } from "./reviews/ReviewList";
import { FavoriteList } from "./favorites/FavoritesList";
import { RestaurantEditForm } from "./restaurants/RestaurantEditForm";
// purpose of this component is to render the individual pages that were selected by navBar
// links, click on the links and the following gets triggered.

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/restaurants">
        <RestaurantList />
      </Route>

      <Route path="/restaurants/create">
        <RestaurantForm />
      </Route>

      <Route exact path="/restaurants/:restaurantId(\d+)">
        <Restaurant />
      </Route>

      <Route path="/reviews/create">
        <ReviewForm />
      </Route>

      <Route exact path="/reviews">
        <ReviewList />
      </Route>

      <Route exact path="/favorites">
        <FavoriteList />
      </Route>

      <Route exact path="/restaurants/edit/:restaurantObjectId(\d+)">
        <RestaurantEditForm />
      </Route>

      {/* <Route exact path="/reviews/edit/:reviewId(\d+)">
        <ReviewEditForm />
      </Route> */}
    </>
  );
};
