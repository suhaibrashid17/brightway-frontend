import React, { useState } from "react";
import { ChevronLeft, Search, Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { GetAllStudentsByClass } from "../../Student/StudentSlice";

const StudentRecords = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [navigationStack, setNavigationStack] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const classes = ["Junior", "Pre-9th", "9th", "10th", "11th", "12th"];
  const juniorClasses = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const getStudents = async (class_) => {
    const response = await dispatch(GetAllStudentsByClass(class_));
    if (response.payload && response.payload.length > 0) {
      setStudents(response.payload);
    } else {
      setStudents([]);
      console.error("No students found in the response payload.");
    }
  };

  const handleClassClick = (class_) => {
    setNavigationStack((prev) => [...prev, selectedClass]);
    setSelectedClass(class_);
    if (class_ !== "Junior") {
      getStudents(class_);
    }
  };

  const handleBack = () => {
    if (navigationStack.length > 0) {
      const prevClass = navigationStack.pop();
      setSelectedClass(prevClass);
      setNavigationStack([...navigationStack]);
      if (prevClass && prevClass !== "Junior") {
        getStudents(prevClass);
      } else {
        setStudents([]);
      }
    } else {
      setSelectedClass(null);
      setStudents([]);
    }
    setSelectedGender(null);
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender === selectedGender ? null : gender);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const formatBirthday = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll_num?.toString().includes(searchTerm);
    const matchesGender = !selectedGender || student.gender === selectedGender;
    const matchesStatus =
      selectedStatus === "all" || student.status === selectedStatus;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const ClassCard = ({ class_ }) => (
    <div
      onClick={() => handleClassClick(class_)}
      className="w-64 h-40 rounded-lg bg-midblue hover:bg-orange transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
    >
      <span className="text-3xl font-bold text-white mb-2">{class_}</span>
      <span className="text-white text-sm">View Students</span>
    </div>
  );

  const JuniorClassCard = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {juniorClasses.map((class_, index) => (
        <div
          key={index}
          onClick={() => handleClassClick(class_)}
          className="w-64 h-40 rounded-lg bg-midblue hover:bg-orange transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
        >
          <span className="text-3xl font-bold text-white mb-2">{class_}</span>
          <span className="text-white text-sm">View Students</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {selectedClass && selectedClass !== "Junior" ? (
        <div className="max-w-full mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="flex items-center px-4 py-2 bg-midblue text-white rounded-lg hover:bg-orange transition-colors mb-4 md:mb-0"
            >
              <ChevronLeft className="mr-2" size={20} />
              Back to Classes
            </button>
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => handleGenderClick(null)}
                className={`px-4 py-2 font-bold rounded-lg ${
                  selectedGender === null
                    ? "bg-orange text-white"
                    : "bg-[#E4E0E1] text-gray-800"
                }`}
              >
                Both Sections
              </button>
              <button
                onClick={() => handleGenderClick("male")}
                className={`px-4 py-2 font-bold rounded-lg ${
                  selectedGender === "male"
                    ? "bg-orange text-white"
                    : "bg-[#E4E0E1] text-gray-800"
                }`}
              >
                Boys
              </button>
              <button
                onClick={() => handleGenderClick("female")}
                className={`px-4 py-2 font-bold rounded-lg ${
                  selectedGender === "female"
                    ? "bg-orange text-white"
                    : "bg-[#E4E0E1] text-gray-800"
                }`}
              >
                Girls
              </button>
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="px-4 py-2 outline-none font-bold rounded-lg bg-[#E4E0E1] text-gray-800 border-none focus:ring-2 focus:ring-orange"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange pl-10"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Table Container with Static Scrollbar */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse table-fixed min-w-[1200px]">
              <thead>
                <tr className="bg-midblue text-white">
                  <th className="border p-2 w-12">#</th>
                  <th className="border p-2 w-32">Roll #</th>
                  <th className="border p-2 w-48">Name</th>
                  <th className="border p-2 w-32">Class</th>
                  <th className="border p-2 w-32">Gender</th>
                  <th className="border p-2 w-48">Birth Date</th>
                  <th className="border p-2 w-48">City</th>
                  <th className="border p-2 w-64">Address</th>
                  <th className="border p-2 w-48">Father Name</th>
                  <th className="border p-2 w-48">Father CNIC</th>
                  <th className="border p-2 w-48">Father Phone</th>
                  <th className="border p-2 w-48">Mother Phone</th>
                  <th className="border p-2 w-48">Device UID</th>
                  <th className="border p-2 w-32">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2 text-center">
                      {student.roll_num}
                    </td>
                    <td className="border p-2">
                      {student.first_name} {student.last_name}
                    </td>
                    <td className="border p-2 text-center">{student.class}</td>
                    <td className="border p-2 text-center">
                      {student.gender}
                    </td>
                    <td className="border p-2 text-center">
                      {formatBirthday(student.birth_date)}
                    </td>
                    <td className="border p-2 text-center">{student.city}</td>
                    <td className="border p-2">{student.address}</td>
                    <td className="border p-2">{student.father_name}</td>
                    <td className="border p-2">{student.father_cnic}</td>
                    <td className="border p-2">{student.father_phone}</td>
                    <td className="border p-2">{student.mother_phone}</td>
                    <td className="border p-2">{student.device_uid}</td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <Edit
                          className="cursor-pointer text-blue-500 hover:text-blue-700"
                          size={20}
                        />
                        <Trash2
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          size={20}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            Class Records
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

export default StudentRecords;