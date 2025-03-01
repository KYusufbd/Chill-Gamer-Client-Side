import { useState, useContext } from "react";
import StarRatings from "react-star-ratings";
import AuthContext from "../contexts/AuthContext";
import ApiContext from "../contexts/ApiContext";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const { api } = useContext(ApiContext);

  const allGenres = [
    "Action",
    "Adventure",
    "RPG",
    "Shooter",
    "Open World",
    "Battle Royale",
    "Strategy",
    "MOBA",
    "Survival",
    "Horror",
    "Sandbox",
    "Puzzle",
    "Fighting",
    "Simulation",
    "Racing",
    "Sports",
    "MMORPG",
    "Card Game",
    "Platformer",
    "Stealth",
    "Other",
  ];

  const addReview = (e) => {
    e.preventDefault();
    const image = e.target[0].value;
    const title = e.target[1].value;
    const description = e.target[2].value;
    const publishing_year = e.target[3].value;
    const genre = e.target[4].value;

    const game = {
      title,
      image,
      genre,
      description,
      publishing_year,
    };

    const review = {
      rating,
      description,
    };

    user
      .getIdToken()
      .then((token) =>
        fetch(`${api}/review`, {
          method: "POST",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ game, review }),
        }),
      )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        e.target.reset();
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const [rating, setRating] = useState(1);
  if (user) {
    return (
      <div className="flex flex-col items-center min-h-screen gap-4 py-4 font-bold">
        <h1 className="text-4xl text-center text-secondary">Add a review</h1>
        <div className="card bg-base-100 w-full max-w-lg mx-auto shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset" onSubmit={addReview}>
              <label className="fieldset-label">Game Image</label>
              <input
                required
                type="url"
                className="input w-full"
                placeholder="Image URL"
              />
              <label className="fieldset-label">Game Title</label>
              <input
                required
                type="text"
                className="input w-full"
                placeholder="Game Title"
              />
              <label className="fieldset-label">Review Description</label>
              <textarea
                required
                className="h-24 textarea textarea-bordered w-full"
                placeholder="Write your review here!"
              ></textarea>
              <label className="fieldset-label">Rating</label>
              <StarRatings
                rating={rating}
                starRatedColor="var(--color-primary)"
                changeRating={(rating) => {
                  setRating(rating);
                }}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
              <label className="fieldset-label">Publishing Year</label>
              <input
                required
                type="year"
                className="input w-full"
                placeholder="Publishting Year"
              />
              <label className="fieldset-label">Genre</label>
              <select className="input w-full" defaultValue="" required>
                <option value="" disabled>
                  Select One
                </option>
                {allGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <label className="fieldset-label">User Email</label>
              <input
                type="email"
                className="input w-full"
                value={user?.email}
                disabled
              />
              <label className="fieldset-label">User Name</label>
              <input
                type="text"
                className="input w-full"
                value={user?.displayName}
                disabled
              />
              <button className="btn btn-neutral mt-4">Add review</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default AddReview;
