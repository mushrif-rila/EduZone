import React from "react";
import courseImg01 from "../images/web-development.png";

const OnCourseCard = (props) => {
  const { id, title, description, images, subheadings } = props.item;

  const buttonStyle = {
    background: '#000000',
    color: '#fff',    
    borderRadius: '10px',    
    zIndex: 999999,
    padding: '4px 25px',
    fontSize: '1rem',
  };
  

  return (
    <div className="single__free__course">
      <div className="free__course__img mb-5">
        <img src={images[0].image} alt="" className="w-100" />
        <button style={buttonStyle }>Continue</button>
      </div>

      <div className="free__course__details">
        <h6>{title}</h6>

        <div className=" d-flex align-items-center gap-5">
          <span className=" d-flex align-items-center gap-2">
            <i class="ri-user-line"></i> {description}
          </span>

          {/* <span className=" d-flex align-items-center gap-2">
            <i class="ri-star-fill"></i> {subheadings.length} subheadings
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default OnCourseCard;
