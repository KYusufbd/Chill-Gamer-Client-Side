import { Swiper, SwiperSlide } from "swiper/react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router";

import "swiper/css";
// import "swiper/css/autoplay";
import "swiper/bundle";
import { Autoplay, Zoom } from "swiper/modules";

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Autoplay, Zoom]}
        autoplay={{ delay: 5000 }}
        speed={1000}
        zoom
      >
        <SwiperSlide>
          <div className="hero bg-[url(https://img.freepik.com/free-photo/3d-rendering-futuristic-background-with-geometric-shapes-colorful-neon-lights_181624-12140.jpg?t=st=1741147908~exp=1741151508~hmac=141091c07d8061fbc52cd9d1b788d2f56b2d3de1f4f0155969e4f063a9782925&w=1380)] text-primary-content min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">
                  <Typewriter
                    words={[
                      "Welcome to Chill-Gamer",
                      "Your Ultimate Hub for Game Reviews!",
                    ]}
                    loop={0}
                    typeSpeed={30}
                    deleteSpeed={20}
                  />
                </h1>
                <p className="py-6 text-2xl font-medium opacity-80">
                  Discover, review, and share your thoughts on your favorite
                  games with a passionate gaming community.
                </p>
                <Link to="/reviews" className="btn btn-primary">
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero bg-[url(https://img.freepik.com/free-photo/view-illuminated-neon-gaming-keyboard-setup-controller_23-2149529367.jpg?t=st=1741147684~exp=1741151284~hmac=064ef64d4260ada0c0afcd573324c1d5ea171d05424a3a41f44f37ff732a2b6d&w=1060)] text-primary-content min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">
                  <Typewriter
                    words={[
                      "Honest & Unbiased Reviews",
                      "Real Reviews by Real Gamers!",
                    ]}
                    loop={0}
                    typeSpeed={30}
                    deleteSpeed={20}
                  />
                </h1>
                <p className="py-6 text-2xl font-medium opacity-80">
                  Read and write detailed reviews, ratings, and experiences on
                  the latest and greatest games.
                </p>
                <Link to="/reviews" className="btn btn-primary">
                  Read Reviews
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero bg-[url(https://img.freepik.com/free-photo/high-angle-gaming-setup-with-computer_23-2149829138.jpg?t=st=1741148213~exp=1741151813~hmac=e6f402a2b869ad73366af431c3a2c77cc1f1208190001adcdcc2e95051bf6e84&w=1060)] text-primary-content min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">
                  <Typewriter
                    words={[
                      "Join the Community",
                      "Be a Part of the Chill-Gamer Squad!",
                    ]}
                    loop={0}
                    typeSpeed={30}
                    deleteSpeed={20}
                  />
                </h1>
                <p className="py-6 text-2xl font-medium opacity-80">
                  Sign up to engage with fellow gamers, share your thoughts, and
                  build your own watchlist.
                </p>
                <Link to="/register" className="btn btn-primary">
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
