import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import I1 from "../Assets/Images/MediaMention/I1.jpg";
import I2 from "../Assets/Images/MediaMention/I2.jpg";
import I3 from "../Assets/Images/MediaMention/I3.jpg";
import I4 from "../Assets/Images/MediaMention/I4.jpg";

interface Props {}

const MediaMentions = (props: Props) => {
  return (
    <Carousel>
      <div>
        <img src={I1} alt="media" />
      </div>
      <div>
        <img src={I2} alt="media" />
      </div>
      <div>
        <img src={I3} alt="media" />
      </div>
      <div>
        <img src={I4} alt="media" />
      </div>
    </Carousel>
  );
};

export default MediaMentions;
