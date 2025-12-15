import React from "react";

const PrimaryButton = ({ text, onClick, classname, disabled = false, type = "button" }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${classname}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
