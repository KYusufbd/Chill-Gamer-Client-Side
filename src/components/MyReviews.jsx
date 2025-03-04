import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import ApiContext from "../contexts/ApiContext";
import LoadingContext from "../contexts/LoadingContext";
import Loading from "./Loading";
import StarRatings from "react-star-ratings";
import swal from "sweetalert";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const { api } = useContext(ApiContext);
  const { myReviews, setMyReviews, setLoading } = useContext(LoadingContext);
  const [modalData, setModalData] = useState({});
  const [rating, setRating] = useState(1);

  const openUpdateModal = (data) => {
    setRating(data.rating);
    setModalData(data);
    document.getElementById("my_modal_3").showModal();
  };

  // Update a review
  const updateReview = (e) => {
    e.preventDefault();
    const title = e.target[1].value;
    const image = e.target[0].value;
    const description = e.target[2].value;
    const publishing_year = e.target[3].value;
    const genre = e.target[4].value;
    const review = e.target[5].value;
    const review_id = modalData.id;

    const gameObj = {
      title,
      image,
      genre,
      description,
      publishing_year,
    };

    const reviewObj = {
      rating,
      review,
    };

    user &&
      user.getIdToken().then((token) => {
        fetch(`${api}/review/${review_id}`, {
          method: "PUT",
          headers: {
            authorization: token,
            "content-type": "application/json",
          },
          body: JSON.stringify({ game: gameObj, review: reviewObj }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            fetchMyReviews();
          });
        setModalData({});
        document.getElementById("my_modal_3").close();
      });
  };

  // Delete a review
  const deleteReview = (id) => {
    user &&
      user.getIdToken().then((token) => {
        fetch(`${api}/review/${id}`, {
          method: "DELETE",
          headers: {
            authorization: token,
            "content-type": "application/json",
          },
        })
          .then((res) => {
            fetchMyReviews();
            return res.json();
          })
          .then((data) => {
            console.log(data);
          });
      });
  };

  // Warn before deleting a review
  const confirmDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this review!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteReview(id);
        swal("Your review has been deleted successfully!", {
          icon: "success",
        });
      } else {
        swal("Your review is not deleted!");
      }
    });
  };

  const fetchMyReviews = () => {
    user.getIdToken().then((token) => {
      setLoading(true);
      fetch(`${api}/my-reviews`, {
        method: "GET",
        headers: {
          authorization: token,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMyReviews(data);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    user && fetchMyReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  if (user) {
    return (
      <>
        <Loading />
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Game</th>
                <th>Description</th>
                <th>Review</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myReviews.map((review) => {
                return (
                  <tr key={review.id}>
                    <td>
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={review.game?.image}
                              alt={review.game?.title}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{review.game?.title}</div>
                          <div className="text-sm opacity-50">
                            {review.game?.genre}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{review.game?.description}</td>
                    <td>{review.review}</td>
                    <th>
                      <div className="flex flex-col">
                        <button
                          className="btn btn-ghost"
                          onClick={() => {
                            openUpdateModal(review);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-ghost"
                          onClick={() => {
                            confirmDelete(review.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form className="fieldset" onSubmit={updateReview}>
              <label className="fieldset-label">Game Image</label>
              <input
                required
                type="url"
                className="input w-full"
                placeholder="Image URL"
                defaultValue={modalData.game?.image}
              />
              <label className="fieldset-label">Game Title</label>
              <input
                required
                type="text"
                className="input w-full"
                placeholder="Game Title"
                defaultValue={modalData.game?.title}
              />
              <label className="fieldset-label">Description</label>
              <textarea
                required
                className="h-24 textarea textarea-bordered w-full"
                placeholder="Game Description"
                defaultValue={modalData.game?.description}
              ></textarea>
              <label className="fieldset-label">Publishing Year</label>
              <input
                required
                type="year"
                className="input w-full"
                placeholder="Publishting Year"
                defaultValue={modalData.game?.publishing_year}
              />
              <label className="fieldset-label">Genre</label>
              <select
                className="input w-full"
                defaultValue={modalData?.game?.genre}
                required
              >
                <option value="" disabled>
                  Select One
                </option>
                {allGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <label className="fieldset-label">Rating</label>
              <StarRatings
                rating={modalData.rating}
                starRatedColor="var(--color-primary)"
                changeRating={(rating) => {
                  setRating(rating);
                }}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
              <label className="fieldset-label">Review</label>
              <textarea
                required
                className="h-24 textarea textarea-bordered w-full"
                placeholder="Write your review here!"
                defaultValue={modalData.review}
              ></textarea>
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
              <button className="btn btn-neutral mt-4">Update Review</button>
            </form>
            <form method="dialog">
              {/* Close button */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </dialog>
      </>
    );
  }
};

export default MyReviews;

console.log("Remove these lines after the code is completed");
/* 
[
    {
        "id": "67c30f336899a00609e2b398",
        "review": "Hollow Knight is a beautifully crafted 2D metroidvania game set in the mysterious, ruined kingdom of Hallownest, featuring challenging combat and deep exploration.",
        "rating": 4,
        "game": {
            "title": "Hollow Knight",
            "image": "https://m.media-amazon.com/images/M/MV5BOTFkMjBkZmMtMzZkOC00NWVmLWIzMmYtOTkyYmViMTVjNWNmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "genre": "Adventure",
            "description": "Hollow Knight is a beautifully crafted 2D metroidvania game set in the mysterious, ruined kingdom of Hallownest, featuring challenging combat and deep exploration.",
            "publishing_year": "2015"
        },
        "user": {
            "name": "Kazi Yusuf (Abu Khubaib)"
        }
    },
    {
        "id": "67c419970d71152d2bc96b5f",
        "review": "Rainbow Six Siege is a tactical FPS where players engage in strategic team-based combat, utilizing unique operators and destructible environments.",
        "rating": 4,
        "game": {
            "title": "Rainbow Six Siege",
            "image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/359550/capsule_616x353.jpg?t=1738608668",
            "genre": "Shooter",
            "description": "Rainbow Six Siege is a tactical FPS where players engage in strategic team-based combat, utilizing unique operators and destructible environments.",
            "publishing_year": "2015"
        },
        "user": {
            "name": "Kazi Yusuf (Abu Khubaib)"
        }
    }
]
*/
