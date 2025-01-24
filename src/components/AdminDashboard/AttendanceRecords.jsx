import React, { useState, useEffect } from "react";
import { ChevronLeft, Search, Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { GetAllStudentsByClass } from "../../Student/StudentSlice";

const AttendanceRecords = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const classes = ["Junior", "Pre-9th", "9th", "10th", "11th", "12th"];

  useEffect(() => {
    if (selectedClass) {
      getStudents(selectedClass);
      fetchAttendance(selectedClass, selectedMonth);
    }
  }, [selectedClass, selectedMonth]);

  const getStudents = async (class_) => {
    const response = await dispatch(GetAllStudentsByClass(class_));
    if (response.payload && response.payload.length > 0) {
      setStudents(response.payload);
    } else {
      setStudents([]);
    }
  };

  const fetchAttendance = async (class_, month) => {
    // Pseudo-backend call to fetch attendance data
    console.log(`Fetching attendance for class ${class_} and month ${month}`);
    const fakeAttendance = {};
    students.forEach((student) => {
      fakeAttendance[student.roll_num] = Array(31)
        .fill(null)
        .map(() => (Math.random() > 0.5 ? "P" : "A"));
    });
    setAttendance(fakeAttendance);
  };

  const handleClassClick = (class_) => {
    setSelectedClass(class_);
  };

  const handleAttendanceChange = (rollNum, dateIndex, value) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNum]: prev[rollNum].map((status, i) =>
        i === dateIndex ? value : status
      ),
    }));
  };

  const updateAttendance = async () => {
    // Pseudo-backend call to update attendance
    console.log("Updating attendance:", attendance);
    alert("Attendance updated successfully!");
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll_num?.toString().includes(searchTerm);
    return matchesSearch;
  });

  const renderTable = () => {
    const daysInMonth = new Date(
      selectedMonth.split("-")[0],
      selectedMonth.split("-")[1],
      0
    ).getDate();
    return (
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-orange text-white">
              <th className="py-4 px-4 text-left">Roll #</th>
              <th className="py-4 px-4 text-left">Name</th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i} className="py-4 px-4 text-center">
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4">{student.roll_num}</td>
                <td className="py-4 px-4">
                  {student.first_name} {student.last_name}
                </td>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <td key={i} className="py-4 px-4 text-center">
                    <input
                      type="text"
                      value={attendance[student.roll_num]?.[i] || ""}
                      onChange={(e) =>
                        handleAttendanceChange(
                          student.roll_num,
                          i,
                          e.target.value
                        )
                      }
                      className="w-10 text-center border rounded"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {selectedClass ? (
        <div className="max-w-full mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <button
              onClick={() => setSelectedClass(null)}
              className="flex items-center px-4 py-2 bg-midblue text-white rounded-lg hover:bg-orange transition-colors mb-4 md:mb-0"
            >
              <ChevronLeft className="mr-2" size={20} />
              Back to Classes
            </button>
            <div className="flex items-center gap-4">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange"
              />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange"
              />
            </div>
            <button
              onClick={updateAttendance}
              className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-midblue transition-colors"
            >
              Update Attendance
            </button>
          </div>
          {renderTable()}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-darkblue mb-8 text-center md:text-left">
            Class Records
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {classes.map((class_, index) => (
              <div
                key={index}
                onClick={() => handleClassClick(class_)}
                className="w-64 h-40 rounded-lg bg-midblue hover:bg-orange transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
              >
                <span className="text-3xl font-bold text-white mb-2">
                  {class_}
                </span>
                <span className="text-white text-sm">View Attendance</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceRecords;
