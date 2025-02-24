import { useContext } from "react";
import LoadingContext from "../contexts/LoadingContext";
import { Link } from "react-router";

const Reviews = () => {
  const { allReviews } = useContext(LoadingContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {allReviews.map((review) => {
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
