import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTeachers, selectTeacherArray } from "../../Teacher/TeacherSlice";
import Teacher from "./TeacherRecords/Teacher";

function TeacherRecords() {
  const dispatch = useDispatch();

  const Teachers = useSelector(selectTeacherArray);
  const GetTeachers = async () => {
    await dispatch(GetAllTeachers());
  };
  useEffect(() => {
    GetTeachers();
  }, []);

  return (
    <div className="flex flex-col w-4/5 space-y-1 p-10">
      <div className="w-full h-12 flex flex-row space-x-1">
        <div className="text-white text-xl bg-orange px-5">#</div>
        <div className="text-white text-xl bg-orange px-5">CNIC</div>
        <div className="text-white text-xl bg-orange px-5">Name</div>
        <div className="text-white text-xl bg-orange px-5">Phone #</div>
        <div className="text-white text-xl bg-orange px-5">Gender</div>
        <div className="text-white text-xl bg-orange px-5">Birth Date</div>
        <div className="text-white text-xl bg-orange px-5">City</div>
        <div className="text-white text-xl bg-orange px-5">Address</div>
        <div className="text-white text-xl bg-orange px-5">Phone Number</div>
        <div className="text-white text-xl bg-orange px-5">Salary</div>
      </div>
      {Teachers &&
        Teachers.map((item, index) => <Teacher teacher={item} index={index} />)}
    </div>
  );
}

export default TeacherRecords;
