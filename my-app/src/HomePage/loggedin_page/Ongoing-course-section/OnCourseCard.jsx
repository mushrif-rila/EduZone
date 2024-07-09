import React from "react";

const OnCourseCard = (props) => {
  const { imgUrl, title, students, rating } = props.item;

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
        <img src={imgUrl} alt="" className="w-100" />
        <button style={buttonStyle }>Continue</button>
      </div>

      <div className="free__course__details">
        <h6>{title}</h6>

        <div className=" d-flex align-items-center gap-5">
          <span className=" d-flex align-items-center gap-2">
            <i class="ri-user-line"></i> {students}k
          </span>

          <span className=" d-flex align-items-center gap-2">
            <i class="ri-star-fill"></i> {rating}k
          </span>
        </div>
      </div>
    </div>
  );
};

export default OnCourseCard;
