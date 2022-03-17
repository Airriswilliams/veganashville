import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getAllReviews } from "../ApiManager";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

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

  return (
    <>
      <h1>VegaNashville Reviews</h1>
      <button onClick={() => history.push("/reviews/create")}>
        New Review
      </button>
      <h2>Leave a Review</h2>

      {reviews.map((review) => {
        return (
          <div key={`review--${review.id}`}>
            <p className={`review ${review.review ? "review" : ""}`}>
              {review.review} Review of {review.restaurant?.name} {""}
              submitted by {review.user.name}
              <button
                onClick={() => {
                  deleteReview(review.id);
                }}
              >
                <FaTrashAlt />
              </button>
              <button
                onClick={() => {
                  history.push(`/reviews/edit/${review.id}`);
                }}
              >
                <FaEdit />
              </button>
            </p>
          </div>
        );
      })}
    </>
  );
};
