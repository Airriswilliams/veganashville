import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getAllRestaurants } from "../ApiManager";

export const RestaurantList = () => {
  // useState returns an array, it's initial value "restaurants"
  // "setRestaurants" is a function that modifies the state
  const [restaurants, setRestaurants] = useState([]);
  const [oldRestaurant, updateRestaurantList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log("Initial useEffect");
    getAllRestaurants().then((restaurantArray) => {
      setRestaurants(restaurantArray);
    });
  }, [oldRestaurant]);

  const deleteRestaurant = (id) => {
    fetch(`http://localhost:8088/restaurants/${id}`, {
      method: "DELETE",
    }).then(() => {
      updateRestaurantList([1]);
    });
  };

  return (
    <>
      <div>
        <button onClick={() => history.push("/restaurants/create")}>
          Add Restaurant
        </button>
      </div>

      {restaurants.map((restaurantObject) => {
        return (
          <div key={`restaurant--${restaurantObject.id}`}>
            {restaurantObject.name}
            <br /> {restaurantObject.description}
            <br /> {restaurantObject.menu}
            <br /> {restaurantObject.address}
            <hr />
            <button
              onClick={() => {
                deleteRestaurant(restaurantObject.id);
              }}
            >
              Delete Restaurant
            </button>
          </div>
        );
      })}
    </>
  );
};
