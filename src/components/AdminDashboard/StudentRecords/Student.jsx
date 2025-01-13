import React from "react";

function Student({ student, index }) {
  return (
    // styling to do...
    <div className="w-full h-20 flex flex-row bg-white dark:bg-darkblue dark:border-white">
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{index}</div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.roll_num}</div>
    <div className="w-2/12 px-6 py-4 text-xl text-gray-900 dark:text-white">
      {student.first_name + " " + student.last_name}
    </div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.class}</div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.gender}</div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.birth_date}</div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.city}</div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.address}</div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.father_name}</div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.father_cnic}</div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.father_phone}</div>
    <div className="w-1/12 px-6 py-4 text-xl text-gray-900 dark:text-white">{student.mother_phone}</div>
  </div>
  );
}

export default Student;
