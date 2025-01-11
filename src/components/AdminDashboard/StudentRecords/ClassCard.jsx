import React from "react";

function ClassCard({ class_, onClick }) {
  return (
    <div
      className="w-1/5 h-64 bg-darkblue text-white rounded-xl flex items-center justify-center hover:scale-105 cursor-pointer hover:opacity-70"
      onClick={onClick}
    >
      <h1 className="font-bold text-xl">
        Class : <span className="text-2xl">{class_}</span>
      </h1>
    </div>
  );
}

export default ClassCard;
