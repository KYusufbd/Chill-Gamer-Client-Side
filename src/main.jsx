import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ApiContext from "./contexts/ApiContext.js";
import Reviews from "./components/Reviews.jsx";
import AddReview from "./components/AddReview.jsx";
import Watchlist from "./components/Watchlist.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AuthProvider from "./firebase/AuthProvider.jsx";
import MyReviews from "./components/MyReviews.jsx";
import Review from "./components/Review.jsx";

const api = "http://localhost:3000";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiContext.Provider value={{ api }}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/review/:id" element={<Review />} />
              <Route path="/add-review" element={<AddReview />} />
              <Route path="/my-reviews" element={<MyReviews />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApiContext.Provider>
  </StrictMode>,
);
