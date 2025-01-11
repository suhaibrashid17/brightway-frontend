import React from "react";

function Teacher({ teacher, index }) {
  return (
    <div className="w-full h-20 flex flex-row bg-orange space-x-1">
      <div className="text-white text-wrap text-xl bg-orange px-5 w-1">
        {index}
      </div>
      <div className="text-white text-wrap text-xl bg-orange px-5">
        {teacher.cnic}
      </div>
      <div className="text-white text-wrap text-xl bg-orange px-5">
        {teacher.first_name + " " + teacher.last_name}
      </div>
      <div className="text-white text-wrap text-xl bg-orange px-5">
        {teacher.phone_num}
      </div>
      <div className="text-white text-wrap text-xl bg-orange px-5">
        {teacher.gender}
      </div>
      <div className="text-white text-wrap text-xl bg-orange px-5">
        {teacher.birth_date}
      </div>
      <div className="text-white text-wrap text-xl bg-orange px-5">
        {teacher.city}
      </div>
      <div className="text-white text-wrap text-xl bg-orange px-5">
        {teacher.address}
      </div>
      <div className="text-white text-wrap text-xl bg-orange px-5">
        {teacher.phone_num}
      </div>
      <div className="text-white text-wrap text-xl bg-orange px-5">
        {teacher.salary}
      </div>
    </div>
  );
}

export default Teacher;
