import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getAllFavorites } from "../ApiManager";
import { FaTrashAlt } from "react-icons/fa";
import "./Favorites.css";

export const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [oldFavorite, updateFavoriteList] = useState([]);
  const history = useHistory();

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
      {favorites.map((favoriteObject) => {
        return (
          <div key={`favorite--${favoriteObject.id}`}>
            <Link to={`/favorites/${favoriteObject.id}`}>
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
    </>
  );
};
