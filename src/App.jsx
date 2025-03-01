import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import LoadingContext from "./contexts/LoadingContext";
import AuthContext from "./contexts/AuthContext";
import ApiContext from "./contexts/ApiContext";

function App() {
  const [theme, setTheme] = useState("purple-light");
  const [loading, setLoading] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const { user } = useContext(AuthContext);
  const { api } = useContext(ApiContext);

  // Theme toggle function
  const themeToggle = () => {
    theme === "purple-dark"
      ? setTheme("purple-light")
      : setTheme("purple-dark");
  };

  // Fetch watchlist data function
  const fetchWatchlist = async () => {
    try {
      user &&
        user.getIdToken().then((token) => {
          setLoading(true);
          fetch(`${api}/watchlist`, {
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
              setWatchlist(data);
              setLoading(false);
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Function to scroll to top when the route is changed.
  const location = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
        allReviews,
        setAllReviews,
        watchlist,
        setWatchlist,
        fetchWatchlist,
      }}
    >
      <div
        data-theme={theme}
        className="card bg-base-200 w-full shrink-0 shadow-2xl flex flex-col justify-center items-center"
      >
        <Navbar themeToggle={themeToggle} theme={theme} />
        <main className="w-[1440px] max-w-full min-h-screen bg-base-200">
          <Outlet />
          <ToastContainer />
        </main>
        <button
          className="rotate-180 rounded-full border-1 border-neutral w-8 h-8 fixed bottom-8 right-8 bg-transparent cursor-pointer opacity-20 hover:opacity-100"
          onClick={() => scrollTo(0, 0)}
        >
          V
        </button>
        <Footer />
      </div>
    </LoadingContext.Provider>
  );
}

export default App;
