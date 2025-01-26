import React, { useState, useEffect } from "react";
import { ChevronLeft, CloudCog } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllStudentsByClass, SaveAttendance, FetchAttendance } from "../../Student/StudentSlice";

const AttendanceRecords = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [navigationStack, setNavigationStack] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendance, setAttendance] = useState({});
  const dispatch = useDispatch();
  const classes = ["Junior", "Pre-9th", "9th", "10th", "11th", "12th"];
  const juniorClasses = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const attendanceData = useSelector((state) => state.student.attendanceData);

  useEffect(() => {
    if (selectedClass) {
      console.log(selectedClass)
      console.log(selectedMonth)
      console.log(selectedYear)
      dispatch(FetchAttendance({ class: selectedClass, month: selectedMonth, year: selectedYear }));
    }
  }, [selectedClass, selectedMonth, selectedYear, dispatch]);

  const handleClassClick = (class_) => {
    setNavigationStack((prev) => [...prev, selectedClass]);
    setSelectedClass(class_);
  };

  const handleBack = () => {
    if (navigationStack.length > 0) {
      const prevClass = navigationStack.pop();
      setSelectedClass(prevClass);
      setNavigationStack([...navigationStack]);
    } else {
      setSelectedClass(null);
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleAttendanceChange = (rollNum, day, status) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNum]: {
        ...prev[rollNum],
        [day]: status,
      },
    }));
  };

  const handleSaveAttendance = async () => {
    const attendanceData = Object.keys(attendance).map((rollNum) => ({
      roll_number: rollNum,
      DnT: new Date(selectedYear, selectedMonth, 1),
    }));

    try {
      await dispatch(SaveAttendance(attendanceData)).unwrap();
      console.log("Attendance saved successfully!");
    } catch (error) {
      console.error("Failed to save attendance:", error);
    }
  };

  // Define the ClassCard component
  const ClassCard = ({ class_ }) => (
    <div
      onClick={() => handleClassClick(class_)}
      className="w-64 h-40 rounded-lg bg-midblue hover:bg-orange transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
    >
      <span className="text-3xl font-bold text-white mb-2">{class_}</span>
      <span className="text-white text-sm">Take Attendance</span>
    </div>
  );

  // Define the JuniorClassCard component
  const JuniorClassCard = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {juniorClasses.map((class_, index) => (
        <div
          key={index}
          onClick={() => handleClassClick(class_)}
          className="w-64 h-40 rounded-lg bg-midblue hover:bg-orange transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
        >
          <span className="text-3xl font-bold text-white mb-2">{class_}</span>
          <span className="text-white text-sm">Take Attendance</span>
        </div>
      ))}
    </div>
  );

  const AttendanceTable = ({ class_ }) => {
    const [students, setStudents] = useState([]);
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    useEffect(() => {
      const fetchStudents = async () => {
        const response = await dispatch(GetAllStudentsByClass(class_));
        setStudents(response.payload || []);
      };
      fetchStudents();
    }, [class_, dispatch]);

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-4 py-2 border rounded-lg"
            >
              {monthNames.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-4 py-2 border rounded-lg"
            >
              {[2023, 2024, 2025].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSaveAttendance}
            className="px-4 py-2 bg-orange text-white rounded-lg"
          >
            Save Attendance
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse table-fixed min-w-[1200px]">
            <thead>
              <tr className="bg-midblue text-white">
                <th className="border p-2 w-48">Student Name</th>
                <th className="border p-2 w-32">Roll Number</th>
                {[...Array(daysInMonth)].map((_, day) => (
                  <th key={day} className="border p-2 w-12">{day + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.roll_num} className="hover:bg-gray-100">
                  <td className="border p-2 w-48">{student.first_name}</td>
                  <td className="border p-2 w-32 text-center">{student.roll_num}</td>
                  {[...Array(daysInMonth)].map((_, day) => (
                    <td key={day} className="border p-2 w-12 text-center">
                      <select
                        value={attendance[student.roll_num]?.[day + 1] || "absent"}
                        onChange={(e) => handleAttendanceChange(student.roll_num, day + 1, e.target.value)}
                        className={`w-full text-center border-none bg-transparent ${
                          attendance[student.roll_num]?.[day + 1] === "present" ? "bg-dgreen" : "bg-[#FA7070]"
                        }`}
                      >
                        <option value="present">P</option>
                        <option value="absent">A</option>
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {selectedClass && selectedClass !== "Junior" ? (
        <div>
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 bg-midblue text-white rounded-lg hover:bg-orange transition-colors mb-4"
          >
            <ChevronLeft className="mr-2" size={20} />
            Back to Classes
          </button>
          <AttendanceTable class_={selectedClass} />
        </div>
      ) : selectedClass === "Junior" ? (
        <>
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 bg-midblue text-white rounded-lg hover:bg-orange transition-colors mb-4"
          >
            <ChevronLeft className="mr-2" size={20} />
            Back to Classes
          </button>
          <JuniorClassCard />
        </>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-darkblue mb-8 text-center md:text-left">
            Attendance Records
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {classes.map((class_, index) => (
              <ClassCard key={index} class_={class_} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceRecords;