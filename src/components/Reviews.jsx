import { useContext, useEffect, useState } from "react";
import LoadingContext from "../contexts/LoadingContext";
import { Link } from "react-router";
import ApiContext from "../contexts/ApiContext";
import Loading from "./Loading";
import { Fade } from "react-awesome-reveal";

const Reviews = () => {
  const { setLoading, allReviews, setAllReviews } = useContext(LoadingContext);
  const { api } = useContext(ApiContext);
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState("acc");

  console.log(sort, order); // Testing purpose

  // Fetch all review:
  useEffect(() => {
    setLoading(true);
    fetch(`${api}/reviews?${sort && "sort=" + sort + "&order=" + order}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllReviews(data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, order]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-row justify-between flex-wrap px-3 py-2">
        <h3 className="text-start text-2xl">All Reviews</h3>
        <div className="flex flex-row gap-5 flex-wrap">
          <div className="flex flex-row items-center gap-2">
            <p>Filter by genre:</p>
            <select name="sort" defaultValue="">
              <option value="">None</option>
              <option value="rating">Rating</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>Sort by:</p>
            <select
              name="sort"
              defaultValue=""
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="rating">Rating</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>Order:</p>
            <select
              name="sort"
              defaultValue="asc"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="des">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <Loading />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
        <Fade>
          {allReviews.map((review) => {
            return (
              <div
                key={review.id}
                className="card bg-base-100 shadow-sm h-full"
              >
                <figure>
                  <img src={review.game.image} alt="Shoes" className="w-full" />
                </figure>
                <div className="card-body">
                  <div>
                    <h2 className="card-title">{review.game.title}</h2>
                    <p className="text-neutral italic">
                      Reviewd by: {review.user.name} (Rated: {review.rating})
                      <br />
                      Published in: {review.game.publishing_year}
                    </p>
                  </div>
                  <p>{review.review}</p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/review/${review.id}`}
                      className="btn btn-primary"
                    >
                      Explore Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </Fade>
      </div>
    </div>
  );
};

export default Reviews;
