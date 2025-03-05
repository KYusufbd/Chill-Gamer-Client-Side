import { useContext, useEffect, useState } from "react";
import ApiContext from "../contexts/ApiContext";
import { Link } from "react-router";
import { Fade } from "react-awesome-reveal";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const { api } = useContext(ApiContext);

  useEffect(() => {
    fetch(`${api}/top-rated`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopRated(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [api]);

  return (
    <div className="flex flex-col gap-4 py-10">
      <h2 className="text-3xl text-center font-bold">Top Rated Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
        <Fade cascade>
          {topRated.map((review) => {
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

export default TopRated;
