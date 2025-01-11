import React from "react";
import ClassCard from "./StudentRecords/ClassCard";

function StudentRecords() {
  const classes = ["Junior", "Pre-9th", "9th", "10th", "11th", "12th"];
  return (
    <div>
      <div className="p-8 space-x-3 space-y-3 flex flex-wrap">
        {classes.map((class_, index) => (
          <ClassCard class_={class_} />
        ))}
      </div>
    </div>
  );
}

export default StudentRecords;
1;
