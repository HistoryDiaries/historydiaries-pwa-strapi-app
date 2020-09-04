import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Logo from "../Assets/Images/Logo.png";
interface Props {}

const SplashScreen = (props: Props) => {
  return (
    <div className="splash">
      <div className="splash-cont">
        <LazyLoadImage
          alt={"Logo"}
          effect="blur"
          className="splash-icon"
          src={Logo} // use normal <img> attributes as props
        />
      </div>
    </div>
  );
};

export default SplashScreen;
