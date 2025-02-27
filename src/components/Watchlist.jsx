import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";
import LoadingContext from "../contexts/LoadingContext";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const { watchlist } = useContext(LoadingContext);
  const navigate = useNavigate();

  // Testing purposes
  console.log(watchlist);

  !user && navigate("/login");

  if (user) {
    return (
      <div>
        <h1 className="text-5xl text-center">This is watchlist page</h1>
      </div>
    );
  }
};

export default Watchlist;
