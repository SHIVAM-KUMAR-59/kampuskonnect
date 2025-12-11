import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button className="px-3 py-2 rounded-md bg-black text-white" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
