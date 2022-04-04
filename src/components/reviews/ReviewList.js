import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getAllReviews } from "../ApiManager";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Chef from "../../images/chef-behind-counter.jpg";

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
      <img src={Chef} />
      {reviews.map((reviewObject) => {
        return (
          <div key={`review--${reviewObject.id}`}>
            <p className={`review ${reviewObject.review ? "review" : ""}`}>
              {reviewObject.review}. Review of {reviewObject.restaurant?.name},{" "}
              {""}
              submitted by {reviewObject.user.name}
              {reviewObject.userId ===
              parseInt(localStorage.getItem("vegan_user")) ? (
                <button
                  onClick={() => {
                    deleteReview(reviewObject.id);
                  }}
                >
                  Delete Review
                  <FaTrashAlt />
                </button>
              ) : null}
              {/* {reviewObject.userId ===
              parseInt(localStorage.getItem("vegan_user")) ? (
                <button
                  onClick={() => {
                    history.push(`/reviews/edit/${reviewObject.id}`);
                  }}
                >
                  <FaEdit />
                </button>
              ) : null} */}
            </p>
          </div>
        );
      })}
    </>
  );
};
