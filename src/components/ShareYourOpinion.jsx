import Lottie from "lottie-react";
import { Link } from "react-router";
import gamingAnimation from '../gaming-animation.json'

const ShareYourOpinion = () => {
  return (
    <div className="hero bg-secondary text-secondary-content p-10">
      <div className="hero-content flex-col md:flex-row">
        <Lottie animationData={gamingAnimation}/>
        <div>
          <h1 className="text-5xl font-bold opacity-80">Share Your Opinion</h1>
          <p className="py-6 opacity-60 text-xl font-medium">
            Your voice matters! Share your thoughts on your favorite games and
            help fellow gamers discover new adventures. Whether it&apos;s a hidden
            gem or a blockbuster hit, let the gaming community know what you
            think!
          </p>
          <Link to="/add-review" className="btn btn-primary">Write a Review</Link>
        </div>
      </div>
    </div>
  );
};

export default ShareYourOpinion;
