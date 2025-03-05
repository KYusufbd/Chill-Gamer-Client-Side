import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/bundle";
import { Link } from "react-router";

const WhatGamersSay = () => {
  const reviews = [
    "Minecraft is an incredible game that allows creativity to flourish. Love the endless possibilities!",
    "PUBG Mobile is thrilling and addictive, but hackers sometimes ruin the experience.",
    "Elden Ring is a masterpiece! The world-building and combat are simply breathtaking.",
    "Clash Royale is a fun and strategic card game, though sometimes matchmaking feels unfair.",
    "Cyberpunk 2077 has a fantastic story but still suffers from some performance issues.",
    "Call of Duty: Mobile is a great FPS experience, but it can get quite pay-to-win at times.",
    "The Witcher 3 is one of the best RPGs ever made! The story and side quests are phenomenal.",
    "Genshin Impact has beautiful visuals and engaging gameplay, but the gacha system is tough.",
    "Fortnite is fun, but the constant meta changes can be frustrating.",
  ];

  return (
    <div className="flex flex-col gap-4 py-10 bg-base-300">
      <h2 className="text-3xl text-center font-bold">What Gamers Say</h2>
      <div>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          autoplay={{
            delay: 4000,
          }}
          navigation={true}
          speed={800}
        >
          {reviews.map((review) => {
            return (
              <SwiperSlide key={reviews.indexOf(review)}>
                <div className="bg-base-100 card-md shadow-sm h-52">
                  <div className="card-body flex flex-col justify-between h-full">
                    <p className="text-xl font-medium italic opacity-60">
                      &quot;{review}&quot;
                    </p>
                    <div className="justify-end card-actions">
                      <Link to="/reviews" className="btn btn-primary">
                        Explore More
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default WhatGamersSay;
