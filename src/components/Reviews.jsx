import { useContext } from "react";
import { useState, useEffect } from "react";
import ApiContext from "../contexts/ApiContext";
import LoadingContext from "../contexts/LoadingContext";
import { Link } from "react-router";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { api } = useContext(ApiContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${api}/reviews`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, [api, setLoading]);

  console.log("Delete lines below!");
  // Development purpose:
  /* 
  {
    "id": "67b9ff90a4519ce3bc92f0f3",
    "review": "PUBG Mobile is thrilling and addictive, but hackers sometimes ruin the experience.",
    "rating": 4,
    "game": {
        "title": "PUBG Mobile",
        "image": "https://images.news18.com/ibnlive/uploads/2021/11/pubg-mobile-163782923116x9.jpg?impolicy=website&width=640&height=360"
    },
    "user": {
        "name": "Maliha"
    }
}
  */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {reviews.map((review) => {
        return (
          <div key={review.id} className="card bg-base-100 shadow-sm">
            <figure>
              <img src={review.game.image} alt="Shoes" className="w-full" />
            </figure>
            <div className="card-body">
              <div>
                <h2 className="card-title">{review.game.title}</h2>
                <p className="text-neutral italic">
                  Reviewd by: {review.user.name} (Rated: {review.rating})
                </p>
              </div>
              <p>{review.review}</p>
              <div className="card-actions justify-end">
                <Link to={`/review/${review.id}`} className="btn btn-primary">
                  Explore Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
