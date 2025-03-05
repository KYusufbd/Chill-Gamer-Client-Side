import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import ApiContext from "../contexts/ApiContext";
import LoadingContext from "../contexts/LoadingContext";
import Loading from "./Loading";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const { watchlist, fetchWatchlist } = useContext(LoadingContext);
  const { api } = useContext(ApiContext);

  const removeFromWatchlist = (gameId) => {
    user.getIdToken().then((token) => {
      fetch(`${api}/watchlist/${gameId}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      })
        .then(() => {
          fetchWatchlist();
        })
        .catch((error) => console.log(error));
    });
  };

  if (user) {
    return (
      <>
        <Loading />
        <div className="overflow-x-auto min-h-screen">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Game</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((game) => {
                return (
                  <tr key={game._id}>
                    <td>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={game.image} alt={game.title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{game.title}</div>
                          <div className="text-sm opacity-50">{game.genre}</div>
                          <div className="text-sm opacity-50">
                            Published in: {game.publishing_year}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {game.description}
                      <br />
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost"
                        onClick={() => removeFromWatchlist(game._id)}
                      >
                        Remove
                      </button>
                    </td>
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

export default Watchlist;
