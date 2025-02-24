import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import LoadingContext from "./contexts/LoadingContext";

function App() {
  const [theme, setTheme] = useState("purple-light");
  const themeToggle = () => {
    theme === "purple-dark"
      ? setTheme("purple-light")
      : setTheme("purple-dark");
  };

  // This code is to scroll to top when the route is changed.
  const location = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <div
        data-theme={theme}
        className="card bg-base-200 w-full shrink-0 shadow-2xl flex flex-col justify-center items-center"
      >
        <Navbar themeToggle={themeToggle} theme={theme} />
        <main className="w-[1440px] max-w-full min-h-screen bg-base-200">
          <Outlet />
          <ToastContainer />
          {loading && (
            <div className="absolute z-10 w-full h-full flex flex-col items-center">
              <span className="loading loading-ring loading-xl mt-40"></span>
            </div>
          )}
        </main>
        <button
          className="rotate-180 rounded-full border-1 border-neutral w-8 h-8 fixed bottom-8 right-8 bg-transparent cursor-pointer opacity-20 hover:opacity-60"
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
