import { useContext, useEffect, useState } from "react";
import ApiContext from "../contexts/ApiContext";
import { useParams } from "react-router";
import LoadingContext from "../contexts/LoadingContext";
import StarRatings from "react-star-ratings";

const Review = () => {
  const { api } = useContext(ApiContext);
  const { setLoading } = useContext(LoadingContext);
  const [review, setReview] = useState({});
  const id = useParams().id;

  useEffect(() => {
    setLoading(true);
    fetch(`${api}/review/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReview(data);
        setLoading(false);
      });
  }, []);

  if (review.game)
    return (
      <div className="w-full p-3">
        <div className="card bg-base-100 w-160 max-w-full mx-auto shadow-sm">
          <figure>
            <img src={review?.game?.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl">{review.game.title}</h2>
            <div className="flex flex-row text-accent text-base">
              <p>Genre: {review.game.genre}</p>
              <p>Published in: {review.game.publishing_year}</p>
            </div>
            <p className="text-lg">{review.game.description}</p>
            <div className="flex flex-col text-base gap-5 border-1 mt-6 p-5 rounded-lg">
              <div className="w-full rounded-md shadow-lg border-t text-center text-secondary -mt-6 bg-base-100 z-10">Review</div>
              <StarRatings
                rating={review.review.rating}
                starRatedColor="purple"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
              <p className="text-lg italic opacity-60 font-medium">&quot;{review.review.review}&quot;</p>
              <div className="flex flex-col">
                <p>Reviewed by {review.user.name}</p>
                <p>Email: {review.user.email}</p>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add To Watchlist</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Review;
