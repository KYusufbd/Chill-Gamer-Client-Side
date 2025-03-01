import { useContext } from "react";
import LoadingContext from "../contexts/LoadingContext";

const Loading = () => {
  const { loading } = useContext(LoadingContext);
  if (loading) {
    return (
      <div className="absolute z-10 w-full h-full flex flex-col items-center">
        <span className="loading loading-ring loading-xl mt-40"></span>
      </div>
    );
  }
};

export default Loading;
