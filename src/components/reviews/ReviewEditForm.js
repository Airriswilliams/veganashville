// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   useHistory,
//   useLocation,
// } from "react-router-dom/cjs/react-router-dom.min";
// import { getAllRestaurants } from "../ApiManager";
// import "./Reviews.css";

// export const ReviewEditForm = () => {
//   const { reviewId } = useParams(); // variable storing the route parameter
//   const [edits, setEdits] = useState([]);
//   const [review, updateReview] = useState({
//     restaurant: "",
//     review: "",
//     // these two state variables will be updated as user interacts with form
//   });
//   const history = useHistory();

//   const location = useLocation();

//   const [detail, setDetail] = useState(defaultDetail);
//   const [restaurants, setRestaurants] = useState([]);
//   useEffect(async () => {
//     const data = await getAllRestaurants();
//     setRestaurants(data);
//   }, [reviewId]);

//   useEffect(() => {
//     return fetch(`http://localhost:8088/reviews/${reviewId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         updateReview(data);
//       });
//   }, [reviewId]);

//   // once Submit Review button is clicked, we need a function to perform Post operation
//   // function that uses state variable to create a new obj to post to API
//   const submitReview = (changeEvent) => {
//     const newReview = {
//       restaurant: review.restaurant,
//       review: review.review,
//       reviewId: parseInt(changeEvent.target.value),
//       //pull FK of customerId from local storage and add it to the new obj to be submitted
//       userId: parseInt(localStorage.getItem("vegan_user")),
//     };
//     event.preventDefault();
//     // send newTicket obj to API
//     const fetchOption = {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // save the body of the request which is the newTicket obj
//       body: JSON.stringify(newReview),
//     };
//     // 1st fetch, go to userReviews and run fetchOption Post to app json and stringify new review which turns it into an obj in database
//     // the next fetch option pulls userReviews again with the new review added to it.
//     return (
//       fetch("http://localhost:8088/userReviews", fetchOption)
//         .then(() => {
//           return fetch("http://localhost:8088/userReviews");
//         })
//         // res.json convert to string????
//         .then((res) => res.json())
//         .then((reviewsfromAPI) => {
//           updateReview(reviewsfromAPI);
//         })
//         .then(() => {
//           history.push("/reviews");
//         })
//     );
//   };
//   //state: { reviewNote: review.review, reviewId: review.id },
//   // now create the actual form the user will use
//   return (
//     <form className="reviewForm">
//       <h2 className="reviewForm__title">Leave a Review</h2>
//       <fieldset>
//         <div className="form-group">
//           <label htmlFor="restaurant">Restaurant</label>
//           <select
//             name="restaurant"
//             value={review.review}
//             onChange={(evt) => {
//               const copy = { ...review };
//               copy.restaurant = evt.target.value;
//               //now that the copy is updated, the copy becomes the new state
//               updateReview(copy);
//             }}
//             defaultValue={defaultSelect}
//           >
//             <option value="0" disabled hidden>
//               Select a Restaurant
//             </option>
//             {restaurants.map((restaurant) => {
//               return (
//                 <option
//                   key={`restaurant--${restaurant.id}`}
//                   value={restaurant.id}
//                 >
//                   {`${restaurant.name}`}
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//       </fieldset>
//       <fieldset>
//         <div className="form-group">
//           <label htmlFor="name">Review</label>
//           <input
//             onChange={(evt) => {
//               const copy = { ...review };
//               setDetail(evt.target.value);
//               copy.review = evt.target.value;
//               updateReview(copy);
//             }}
//             required
//             autoFocus
//             type="text"
//             className="form-control"
//             placeholder="How'd you like it?"
//             value={detail}
//           />
//         </div>
//         <select id="review" onChange={submitReview}>
//           {reviewsfromAPI.map((review) => {
//             return (
//               <option value={review.id} key={`review--${review.id}`}>
//                 {review.restaurant}
//                 {review.review}
//               </option>
//             );
//           })}
//         </select>
//       </fieldset>
//       <button onClick={submitReview} className="btn btn-primary">
//         Update Review
//       </button>
//     </form>
//   );
// };
