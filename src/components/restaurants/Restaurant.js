import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Restaurants.css";

export const Restaurant = () => {
  const [restaurant, setRestaurant] = useState({}); // State variable for current restaurant object
  // obj destructuring "restaurantId" matches restaurantId in app views ln 40 route path
  // useParams allows your code to read a route parameter from the URL.
  const { restaurantId } = useParams(); // Variable storing the route parameter

  useEffect(
    () => {
      fetch(
        `http://localhost:8088/restaurants/${restaurantId}?_expand=category`
      )
        .then((res) => res.json())
        .then(setRestaurant);
    },
    [restaurantId] // Above function runs when the value of restaurantId change
  );

  return (
    <>
      <section className="restaurant">
        <div className="restaurants">
          <h3 className="restaurant__name">{restaurant.name}</h3>
          {restaurant.name} is located at {restaurant.address}. {""}
          One of the best vegan spots in town for {restaurant.menu}
        </div>
        <div className="restaur-image">
          <img src={restaurant.image} className="restaurantList__image"></img>
        </div>
        <div className="description">
          {restaurant.description}
          Type of Cuisine: {""}
          {restaurant.category?.type}
        </div>
      </section>
    </>
  );
};
