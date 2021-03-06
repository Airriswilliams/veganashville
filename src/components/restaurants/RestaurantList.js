import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getAllRestaurants } from "../ApiManager";
import { FaTrashAlt } from "react-icons/fa";
import { GiTacos } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Avocado from "../../images/avocado.jpg";
import "./Restaurants.css";

export const RestaurantList = () => {
  // useState returns an array, it's initial value "restaurants"
  // "setRestaurants" is a function that modifies the state
  const [restaurants, setRestaurants] = useState([]);
  const [oldRestaurant, updateRestaurantList] = useState([]);
  const history = useHistory();

  useEffect(() => {
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
  //localStorage.setItem("vegan_user_role", String(exists.admin));
  const isAdmin = localStorage.getItem("vegan_user_role")
    ? JSON.parse(localStorage.getItem("vegan_user_role"))
    : false;

  return (
    <>
      {isAdmin && (
        <div>
          <button onClick={() => history.push("/restaurants/create")}>
            <GiTacos />
            Add Restaurant
          </button>
        </div>
      )}
      <div className="restaurant_list_section">
        {restaurants.map((restaurantObject) => {
          return (
            <div
              className="restaurant_list"
              key={`restaurant--${restaurantObject.id}`}
            >
              <div className="restaurant_image">
                <img
                  src={restaurantObject.image}
                  className="displayRestaurantImage"
                />
              </div>
              <Link to={`/restaurants/${restaurantObject.id}`}>
                {restaurantObject.name}
              </Link>
              {isAdmin || (
                <button
                  onClick={() => {
                    // get userId from local storage, step 2 get the current restaurants id
                    // step 3 do post fetch to favorites
                    const favoriteObject = {
                      userId: parseInt(localStorage.getItem("vegan_user")),
                      restaurantId: restaurantObject.id,
                    };

                    const fetchOption = {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(favoriteObject),
                    };

                    return fetch(
                      "http://localhost:8088/favorites",
                      fetchOption
                    ).then(() => {
                      history.push("/favorites");
                    });
                  }}
                >
                  <MdFavorite />
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => {
                    deleteRestaurant(restaurantObject.id);
                  }}
                >
                  <FaTrashAlt />
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => {
                    history.push(`/restaurants/edit/${restaurantObject.id}`);
                  }}
                >
                  <FaEdit />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
