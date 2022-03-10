export const getAllUsers = () => {
  return fetch("http://localhost:8088/users").then((res) => res.json());
};

export const getAllRestaurants = () => {
  return fetch("http://localhost:8088/restaurants").then((res) => res.json());
};
