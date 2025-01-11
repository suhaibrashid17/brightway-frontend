import React from "react";

function Student({ student, index }) {
  return (
    // styling to do...
    <div className="w-full h-20 flex flex-row bg-orange space-x-5">
      <h1 className="text-white text-xl">{index}</h1>
      <h1 className="text-white text-xl">{student.roll_num}</h1>
      <h1 className="text-white text-xl">
        {student.first_name + " " + student.last_name}
      </h1>
      <h1 className="text-white text-xl">{student.class}</h1>
      <h1 className="text-white text-xl">{student.gender}</h1>
      <h1 className="text-white text-xl">{student.birth_date}</h1>
      <h1 className="text-white text-xl">{student.city}</h1>
      <h1 className="text-white text-xl">{student.address}</h1>
      <h1 className="text-white text-xl">{student.father_name}</h1>
      <h1 className="text-white text-xl">{student.father_cnic}</h1>
      <h1 className="text-white text-xl">{student.father_phone}</h1>
      <h1 className="text-white text-xl">{student.mother_phone}</h1>
    </div>
  );
}

export default Student;
