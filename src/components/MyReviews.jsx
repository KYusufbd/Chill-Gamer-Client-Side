import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import ApiContext from "../contexts/ApiContext";
import LoadingContext from "../contexts/LoadingContext";
import Loading from "./Loading";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const { api } = useContext(ApiContext);
  const { myReviews, setMyReviews, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    user &&
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={review.game.image}
                              alt={review.game.title}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{review.game.title}</div>
                          <div className="text-sm opacity-50">
                            {review.game.genre}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{review.game.description}</td>
                    <td>{review.review}</td>
                    <th>
                      <div className="flex flex-col">
                        <button className="btn btn-ghost">Update</button>
                        <button className="btn btn-ghost">Delete</button>
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
