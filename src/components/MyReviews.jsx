import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  !user && navigate("/login");
  if (user) {
    return (
      <div>
        <h1 className="text-5xl text-center">My Reviews</h1>
      </div>
    );
  }
};

export default MyReviews;
