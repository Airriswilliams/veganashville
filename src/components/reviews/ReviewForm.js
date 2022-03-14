import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const ReviewForm = () => {
  const [review, updateReview] = useState({
    restaurant: "",
    review: "",
    // these two state variables will be updated as user interacts with form
  });

  const history = useHistory();
  // once Submit Review button is clicked, we need a function to perform Post operation
  // function that uses state variable to create a new obj to post to API
  const submitReview = (event) => {
    const newReview = {
      restaurant: review.restaurant,
      review: review.review,
      //pull FK of customerId from local storage and add it to the new obj to be submitted
      userId: parseInt(localStorage.getItem("vegan_user")),
    };
    event.preventDefault();
    // send newTicket obj to API
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // save the body of the request which is the newTicket obj
      body: JSON.stringify(newReview),
    };

    return fetch("http://localhost:8088/userReviews", fetchOption).then(() => {
      history.push("/reviews");
    });
  };
  // now create the actual form the user will use
  return (
    <form className="reviewForm">
      <h2 className="reviewForm__title">Leave a Review</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="restaurant">Restaurant:</label>
          <input
            onChange={(evt) => {
              // use setter function to change state, 1. copy the existing state by using the spread operator
              // copy variable is now a brand new obj with all the values copied from our state
              const copy = { ...review };
              //modify the copy i.e. change the description from a blank string "" to whatever has been typed in
              copy.restaurant = evt.target.value;
              //now that the copy is updated, the copy becomes the new state
              updateReview(copy);
            }}
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Tell us what you thought"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Review:</label>
          <input
            textarea
            onChange={(evt) => {
              const copy = { ...review };
              copy.review = evt.target.value;
              updateReview(copy);
            }}
          />
        </div>
      </fieldset>
      <button onClick={submitReview} className="btn btn-primary">
        Submit Review
      </button>
    </form>
  );
};
