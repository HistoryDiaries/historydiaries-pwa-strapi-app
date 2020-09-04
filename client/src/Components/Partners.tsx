import React from "react";
import Empty from "../Assets/Images/amusement-park.svg";
import I1 from "../Assets/Images/Logo_School/Amity.jpg";
import I2 from "../Assets/Images/Logo_School/Bal_Bharti_Rohini.png";
import I3 from "../Assets/Images/Logo_School/cambridge.jpeg";
import I4 from "../Assets/Images/Logo_School/GD Salwan.png";
import I5 from "../Assets/Images/Logo_School/Gyan_Vihar.png";
import I6 from "../Assets/Images/Logo_School/Laxman.png";
import I7 from "../Assets/Images/Logo_School/Manav_Rachna.png";
import I8 from "../Assets/Images/Logo_School/Muni_International.jpg";
import I9 from "../Assets/Images/Logo_School/St. Marys.png";
import I10 from "../Assets/Images/Logo_School/Tagore.png";
import I11 from "../Assets/Images/Logo_School/Uttam.png";

interface Props {}

const Partners = (props: Props) => {
  const list = [I1, I2, I3, I6, I7, I4, I5, I8, I9, I10, I11];
  return (
    <div className="partner-list">
      {list.map((e, i) => (
        <div key={i}>
          <img src={e} className="partner-image" alt="partner" />
        </div>
      ))}
    </div>
  );
};

export default Partners;
