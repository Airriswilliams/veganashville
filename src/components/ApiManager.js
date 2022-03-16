export const getAllUsers = () => {
  return fetch("http://localhost:8088/users").then((res) => res.json());
};

export const getAllRestaurants = () => {
  return fetch("http://localhost:8088/restaurants")
    .then((res) => res.json())
    .then((data) => data);
};

export const getAllReviews = () => {
  return fetch("http://localhost:8088/userReviews?_expand=user").then((res) =>
    res.json()
  );
};

export const getAllFavorites = () => {
  return fetch("http://localhost:8088/favorites?_expand=restaurant")
    .then((res) => res.json())
    .then((data) => data);
};
