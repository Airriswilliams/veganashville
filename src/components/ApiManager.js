export const getAllUsers = () => {
  return fetch("http://localhost:8088/users").then((res) => res.json());
};

export const getAllRestaurants = () => {
  return fetch("http://localhost:8088/restaurants?_expand=category")
    .then((res) => res.json())
    .then((data) => data);
};

export const getAllReviews = () => {
  return fetch(
    "http://localhost:8088/userReviews?_expand=user&_expand=restaurant"
  ).then((res) => res.json());
};

export const getAllFavorites = () => {
  return fetch("http://localhost:8088/favorites?_expand=restaurant")
    .then((res) => res.json())
    .then((data) => data);
};

export const getAllCategories = () => {
  return fetch("http://localhost:8088/categories")
    .then((res) => res.json())
    .then((data) => data);
};

export const getRestaurantbyId = (id) => {
  return fetch(`http://localhost:8088/restaurants/${id}`)
    .then((res) => res.json())
    .then((data) => data);
};

export const getReviewbyId = (id) => {
  return fetch(`http://localhost:8088/reviews/${id}`)
    .then((res) => res.json())
    .then((data) => data);
};
