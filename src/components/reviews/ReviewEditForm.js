import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { getAllRestaurants, getReviewbyId } from "../ApiManager";
import "./Reviews.css";

export const ReviewEditForm = () => {
  const { reviewObjectId } = useParams(); // variable storing the route parameter
  const [modifiedReview, updateModifiedReview] = useState({});

  const history = useHistory();

  const [restaurants, setRestaurants] = useState([]);
  useEffect(async () => {
    const data = await getAllRestaurants();
    setRestaurants(data);
  }, [reviewObjectId]);

  useEffect(() => {
    getReviewbyId(reviewObjectId).then((data) => updateModifiedReview(data));
  }, []);

  // once Submit Review button is clicked, we need a function to perform Post operation
  // function that uses state variable to create a new obj to post to API
  const submitModifiedReview = (event) => {
    const editedReview = {
      restaurantId: parseInt(modifiedReview.restaurantId),
      review: modifiedReview.review,
      //pull FK of customerId from local storage and add it to the new obj to be submitted
      userId: parseInt(localStorage.getItem("vegan_user")),
    };
    event.preventDefault();
    // send newTicket obj to API
    const fetchOption = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // save the body of the request which is the newTicket obj
      body: JSON.stringify(editedReview),
    };
    // 1st fetch, go to userReviews and run fetchOption Post to app json and stringify new review which turns it into an obj in database
    // the next fetch option pulls userReviews again with the new review added to it.
    return fetch(
      `http://localhost:8088/reviews/${modifiedReview.id}`,
      fetchOption
    )
      .then((res) => res.json())
      .then((editedReviewFromAPI) => {
        updateModifiedReview(editedReviewFromAPI);
      })
      .then(() => {
        history.push("/reviews");
      });
  };
  //state: { reviewNote: review.review, reviewId: review.id },
  // now create the actual form the user will use
  return (
    <form className="reviewEditForm">
      <h2 className="reviewEditForm__title">Leave a Review</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="restaurant">Restaurant</label>
          <select
            name="restaurant"
            value={modifiedReview.restaurantId}
            onChange={(evt) => {
              const copy = { ...modifiedReview };
              copy.restaurantId = evt.target.value;
              //now that the copy is updated, the copy becomes the new state
              updateModifiedReview(copy);
            }}
          >
            <option value="0" disabled hidden>
              Select a Restaurant
            </option>
            {restaurants.map((restaurant) => {
              return (
                <option
                  key={`restaurant--${restaurant.id}`}
                  value={`${restaurant.id}`}
                >
                  {`${restaurant.name}`}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Review</label>
          <input
            value={modifiedReview.review}
            onChange={(evt) => {
              const copy = { ...modifiedReview };
              copy.review = evt.target.value;
              updateModifiedReview(copy);
            }}
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="How'd you like it?"
          />
        </div>
      </fieldset>
      <button onClick={submitModifiedReview} className="btn btn-primary">
        Submit Review
      </button>
    </form>
  );
};
