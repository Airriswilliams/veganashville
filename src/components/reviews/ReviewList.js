import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getAllReviews } from "../ApiManager";
import "./Reviews.css";

export const ReviewList = () => {
  const [reviews, updateReviews] = useState([]);
  const [gointToDeleteReview, updategoingToDeleteReview] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllReviews().then((reviewArray) => {
      updateReviews(reviewArray);
    });
  }, [gointToDeleteReview]);

  //Function to delete the service request.
  const deleteReview = (id) => {
    fetch(`http://localhost:8088/userReviews/${id}`, {
      method: "DELETE",
      // after DELETE operation, we need to GET all the service tickets again and render the new state.
    }).then(() => {
      updategoingToDeleteReview([1]);
    });
  };

  {
    /* use history() to immediately change URL to show the ticket form /tickets/create */
  }
  return (
    <>
      <button onClick={() => history.push("/reviews/create")}>
        New Review
      </button>
      {/* // is ticket.emergency true, if yes emergency if false ticket //{" "}
      <Link>{ticket.description}</Link> links are creating a link for each
      individual ticket // when hyperlink is clicked the view will change to
      just the details of that ticket */}
      {reviews.map((review) => {
        return (
          <div key={`review--${review.id}`}>
            <p className={`ticket ${review.review ? "review" : ""}`}>
              <Link to={`/reviews/${review.id}`}>{review.review}</Link>{" "}
              submitted by {review.user.name}
              <button
                onClick={() => {
                  deleteReview(review.id);
                }}
              >
                Delete
              </button>
            </p>
          </div>
        );
      })}
    </>
  );
};
