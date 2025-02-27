import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";
import LoadingContext from "../contexts/LoadingContext";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const { watchlist } = useContext(LoadingContext);
  const navigate = useNavigate();

  !user && navigate("/login");

  if (user) {
    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Publishing Year</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((game) => {
              return (
                <tr key={game._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={game.image}
                            alt={game.title}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{game.title}</div>
                        <div className="text-sm opacity-50">{game.genre}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {game.description}
                    <br />
                  </td>
                  <td>{game.publishing_year}</td>
                  <th>
                    <button className="btn btn-ghost">Remove</button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Watchlist;
