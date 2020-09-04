import React from "react";

interface Props {}

const ScrollTop = (props: Props) => {
  return (
    <div
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      className="scrollTop"
    >
      <i className="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
  );
};

export default ScrollTop;
