import React, { useState } from "react";
import ClassCard from "./StudentRecords/ClassCard";
import { useDispatch, useSelector } from "react-redux";
import { GetAllStudentsByClass } from "../../Student/StudentSlice";

import Student from "././StudentRecords/Student";

function StudentRecords() {
  const dispatch = useDispatch();
  const [Students, SetStudents] = useState([]);
  const [ClassCardSelected, SetClassCardSelected] = useState(false);
  const [BackButtonPressed, SetBackButtonPressed] = useState(false);

  const GetStudents = async (class_) => {
    const response = await dispatch(GetAllStudentsByClass(class_));
    console.log("inside records after response");
    console.log(response);
    if (response.payload && response.payload.length > 0) {
      SetStudents(response.payload);
    } else {
      SetStudents([]);
      console.error("No students found in the response payload.");
    }
  };

  const handleClassClick = (class_) => {
    SetClassCardSelected(true);
    GetStudents(class_);
  };

  const handleBack = () => {
    SetClassCardSelected(false);
    SetStudents([]);
  };

  const classes = ["Junior", "Pre-9th", "9th", "10th", "11th", "12th"];

  return (
    <div>
      {ClassCardSelected ? (
        <>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
            onClick={handleBack}
          >
            Back
          </button>
          <div className="flex flex-col w-4/5 space-y-1 p-10">
            <div className="w-full h-12 flex flex-row space-x-1">
              <div className="text-white text-xl bg-orange px-5">#</div>
              <div className="text-white text-xl bg-orange px-5">Roll #</div>
              <div className="text-white text-xl bg-orange px-5">Name</div>
              <div className="text-white text-xl bg-orange px-5">Class</div>
              <div className="text-white text-xl bg-orange px-5">Gender</div>
              <div className="text-white text-xl bg-orange px-5">
                Birth Date
              </div>
              <div className="text-white text-xl bg-orange px-5">City</div>
              <div className="text-white text-xl bg-orange px-5">Address</div>
              <div className="text-white text-xl bg-orange px-5">
                Father Name
              </div>
              <div className="text-white text-xl bg-orange px-5">
                Father CNIC
              </div>
              <div className="text-white text-xl bg-orange px-5">
                Father Phone
              </div>
              <div className="text-white text-xl bg-orange px-5">
                Mother Phone
              </div>
            </div>
            {Students &&
              Students.map((item, index) => (
                <Student student={item} index={index} />
              ))}
          </div>
        </>
      ) : (
        <div className="p-8 space-x-3 space-y-3 flex flex-wrap">
          {classes.map((class_, index) => (
            <ClassCard
              class_={class_}
              onClick={() => handleClassClick(class_)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentRecords;
