import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllCategories, getRestaurantbyId } from "../ApiManager";

export const RestaurantEditForm = () => {
  const { restaurantObjectId } = useParams();
  // variable storing the route parameter
  const [changedRestaurant, updateChangedRestaurant] = useState({});

  const [categories, setCategories] = useState([]);
  useEffect(async () => {
    const data = await getAllCategories();
    setCategories(data);
  }, [restaurantObjectId]);

  useEffect(() => {
    getRestaurantbyId(restaurantObjectId).then((data) =>
      updateChangedRestaurant(data)
    );
  }, []);

  const history = useHistory();
  // once Add restaurant button is clicked, we need a function to perform Post operation

  // find id of restaurant added
  const submitChange = (event) => {
    const editedRestaurant = {
      name: changedRestaurant.name,
      address: changedRestaurant.address,
      menu: changedRestaurant.menu,
      description: changedRestaurant.description,
      categoryId: parseInt(changedRestaurant.categoryId),
    };
    event.preventDefault();
    // send addedRest obj to API
    const fetchOption = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      //   save the body of the request which is the chosenRestaurant obj
      body: JSON.stringify(editedRestaurant),
    };

    return fetch(
      `http://localhost:8088/restaurants/${changedRestaurant.id}`,
      fetchOption
    )
      .then((res) => res.json())
      .then((editedRestaurantFromAPI) => {
        updateChangedRestaurant(editedRestaurantFromAPI);
      })
      .then(() => {
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
              value={changedRestaurant.name}
              required
              autoFocus
              id="name"
              type="text"
              className="form-control"
              placeholder="Name of New Restaurant"
              onChange={(evt) => {
                const copy = { ...changedRestaurant };
                copy.name = evt.target.value;
                updateChangedRestaurant(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              value={changedRestaurant.address}
              required
              autoFocus
              id="address"
              type="text"
              className="form-control"
              placeholder="Directions Please"
              onChange={(evt) => {
                const copy = { ...changedRestaurant };
                copy.address = evt.target.value;
                updateChangedRestaurant(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Menu</label>
            <input
              value={changedRestaurant.menu}
              required
              autoFocus
              id="menu"
              type="text"
              className="form-control"
              placeholder="Vegan only or Hybrid?"
              onChange={(evt) => {
                const copy = { ...changedRestaurant };
                copy.menu = evt.target.value;
                updateChangedRestaurant(copy);
              }}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Description</label>
            <input
              value={changedRestaurant.description}
              required
              autoFocus
              id="description"
              type="text"
              className="form-control"
              placeholder="Is this place a vibe?"
              onChange={(evt) => {
                const copy = { ...changedRestaurant };
                copy.description = evt.target.value;
                updateChangedRestaurant(copy);
              }}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={changedRestaurant.categoryId}
              onChange={(evt) => {
                const copy = { ...changedRestaurant };
                copy.categoryId = evt.target.value;
                updateChangedRestaurant(copy);
              }}
            >
              <option value="0" disabled hidden>
                Select a Category
              </option>
              {categories.map((category) => {
                return (
                  <option
                    key={`category--${category.id}`}
                    value={`${category.id}`}
                  >
                    {`${category.type}`}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>

        <button onClick={submitChange} className="btn btn-primary">
          Finish Adding
        </button>
      </form>
    </>
  );
};
