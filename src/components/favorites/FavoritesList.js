import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getAllFavorites } from "../ApiManager";
import { FaTrashAlt } from "react-icons/fa";
import "./Favorites.css";
import { getAllRestaurants } from "../ApiManager";
import Salad from "../../images/healthySalad.jpg";

export const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [restaurants, setAllRestaurants] = useState([]);
  const [oldFavorite, updateFavoriteList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log("Initial useEffect");
    getAllRestaurants().then((restaurantArray) => {
      setAllRestaurants(restaurantArray);
    });
  }, []);

  useEffect(() => {
    console.log("Initial useEffect");
    getAllFavorites().then((favoritesArray) => {
      setFavorites(favoritesArray);
    });
  }, [oldFavorite]);

  const deleteFavorite = (id) => {
    fetch(`http://localhost:8088/favorites/${id}`, {
      method: "DELETE",
    }).then(() => {
      updateFavoriteList([1]);
    });
  };

  return (
    <>
      <h1>My Favorites</h1>
      <div className="favorite_list_section">
        {favorites.map((favoriteObject) => {
          const foundRestaurant = restaurants.find(
            (restaurant) => restaurant.id === favoriteObject.restaurantId
          );
          return (
            <div key={`favorite--${favoriteObject.id}`}>
              <div className="restaurant_image">
                <img src={Salad} />
              </div>
              <Link to={`/restaurants/${foundRestaurant?.id}`}>
                {favoriteObject.restaurant?.name}
              </Link>

              <button
                onClick={() => {
                  deleteFavorite(favoriteObject.id);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
