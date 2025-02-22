import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

function App() {
  const [theme, setTheme] = useState("purple-light");
  const themeToggle = () => {
    theme === "purple-dark"
      ? setTheme("purple-light")
      : setTheme("purple-dark");
  };

  return (
    <div
      data-theme={theme}
      className="card bg-base-100 w-full shrink-0 shadow-2xl flex flex-col justify-center items-center"
    >
      <Navbar themeToggle={themeToggle} theme={theme} />
      <main className="w-[1440px] max-w-full h-screen bg-base-200">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
