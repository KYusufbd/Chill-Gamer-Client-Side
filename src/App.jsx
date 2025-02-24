import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";

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

  return (
    <div
      data-theme={theme}
      className="card bg-base-100 w-full shrink-0 shadow-2xl flex flex-col justify-center items-center"
    >
      <Navbar themeToggle={themeToggle} theme={theme} />
      <main className="w-[1440px] max-w-full min-h-screen bg-base-200">
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
