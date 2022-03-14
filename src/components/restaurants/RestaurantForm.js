import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const form = {name: "", address: "" etc...} var = to an obj
export const RestaurantForm = () => {
  const [restaurant, newRestaurant] = useState({
    name: "",
    address: "",
    menu: "",
    description: "",
  });
  const history = useHistory();
  // once Add restaurant button is clicked, we need a function to perform Post operation
  // function that uses state variable to create a new obj to post to API

  // send chosenRestaurant obj to API
  // find id of restaurant added
  const sendRestaurant = (event) => {
    const addedRestaurant = {
      name: restaurant.name,
      address: restaurant.address,
      menu: restaurant.menu,
      description: restaurant.description,
      categoryId: 1,
    };
    event.preventDefault();
    // send addedRest obj to API
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   save the body of the request which is the chosenRestaurant obj
      body: JSON.stringify(addedRestaurant),
    };

    return fetch("http://localhost:8088/restaurants", fetchOption).then(() => {
      //   the history.push below ??
      history.push("/restaurants");
    });
  };
  // create add restaurant form user will interact w/

  return (
    <>
      <form>
        <h2>New VegaNashville Restaurant</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              required
              autoFocus
              id="name"
              type="text"
              className="form-control"
              placeholder="Name of New Restaurant"
              onChange={(evt) => {
                const copy = { ...restaurant };
                copy.name = evt.target.value;
                newRestaurant(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              required
              autoFocus
              id="address"
              type="text"
              className="form-control"
              placeholder="Directions Please"
              onChange={(evt) => {
                const copy = { ...restaurant };
                copy.address = evt.target.value;
                newRestaurant(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Menu</label>
            <input
              required
              autoFocus
              id="menu"
              type="text"
              className="form-control"
              placeholder="Vegan only or Hybrid?"
              onChange={(evt) => {
                const copy = { ...restaurant };
                copy.menu = evt.target.value;
                newRestaurant(copy);
              }}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Description</label>
            <input
              required
              autoFocus
              id="description"
              type="text"
              className="form-control"
              placeholder="Is this place a vibe?"
              onChange={(evt) => {
                const copy = { ...restaurant };
                copy.description = evt.target.value;
                newRestaurant(copy);
              }}
            />
          </div>
        </fieldset>

        <button className="btn btn-primary" onClick={sendRestaurant}>
          Finish Adding
        </button>
      </form>
    </>
  );
};
