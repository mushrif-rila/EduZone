import React from 'react';
import { useNavigate } from 'react-router-dom';

function ButtonComp({ to, children }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button onClick={handleClick}>{children}</button>
  );
}

export default ButtonComp;
