import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import ApiContext from "../contexts/ApiContext";
import LoadingContext from "../contexts/LoadingContext";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const { api } = useContext(ApiContext);
  const { myReviews, setMyReviews } = useContext(LoadingContext);

  useEffect(() => {
    user &&
      user.getIdToken().then((token) => {
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
            console.log(data);
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(myReviews);

  if (user) {
    return (
      <div>
        <h1 className="text-5xl text-center">My Reviews</h1>
      </div>
    );
  }
};

export default MyReviews;
