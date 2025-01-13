import React, { useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { GetAllStudentsByClass } from "../../Student/StudentSlice";

const StudentRecords = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const classes = ["Junior", "Pre-9th", "9th", "10th", "11th", "12th"];

  const getStudents = async (class_) => {
    const response = await dispatch(GetAllStudentsByClass(class_));
    console.log("inside records after response");
    console.log(response);
    if (response.payload && response.payload.length > 0) {
      setStudents(response.payload);
    } else {
      setStudents([]);
      console.error("No students found in the response payload.");
    }
  };

  const handleClassClick = (class_) => {
    setSelectedClass(class_);
    getStudents(class_);
  };

  const handleBack = () => {
    setSelectedClass(null);
    setStudents([]);
  };

  const filteredStudents = students.filter(student => 
    student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_num?.toString().includes(searchTerm)
  );

  const ClassCard = ({ class_ }) => (
    <div 
      onClick={() => handleClassClick(class_)}
      className="w-64 h-40 rounded-lg bg-midblue hover:bg-orange transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
    >
      <span className="text-3xl font-bold text-white mb-2">{class_}</span>
      <span className="text-white text-sm">View Students</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {selectedClass ? (
        <div className="max-w-full mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="flex items-center px-4 py-2 bg-midblue text-white rounded-lg hover:bg-orange transition-colors mb-4 md:mb-0"
            >
              <ChevronLeft className="mr-2" size={20} />
              Back to Classes
            </button>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange pl-10"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {filteredStudents.map((student, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{student.first_name} {student.last_name}</span>
                  <span className="bg-orange text-white px-2 py-1 rounded">{student.roll_num}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="font-medium">Class:</span> {student.class}</div>
                  <div><span className="font-medium">Gender:</span> {student.gender}</div>
                  <div><span className="font-medium">Birth Date:</span> {student.birth_date}</div>
                  <div><span className="font-medium">City:</span> {student.city}</div>
                  <div><span className="font-medium">Address:</span> {student.address}</div>
                  <div><span className="font-medium">Father Name:</span> {student.father_name}</div>
                  <div><span className="font-medium">Father CNIC:</span> {student.father_cnic}</div>
                  <div><span className="font-medium">Father Phone:</span> {student.father_phone}</div>
                  <div><span className="font-medium">Mother Phone:</span> {student.mother_phone}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-orange text-white">
                  <th className="py-4 px-4 text-left">#</th>
                  <th className="py-4 px-4 text-left">Roll #</th>
                  <th className="py-4 px-4 text-left">Name</th>
                  <th className="py-4 px-4 text-left">Class</th>
                  <th className="py-4 px-4 text-left">Gender</th>
                  <th className="py-4 px-4 text-left">Birth Date</th>
                  <th className="py-4 px-4 text-left">City</th>
                  <th className="py-4 px-4 text-left">Address</th>
                  <th className="py-4 px-4 text-left">Father Name</th>
                  <th className="py-4 px-4 text-left">Father CNIC</th>
                  <th className="py-4 px-4 text-left">Father Phone</th>
                  <th className="py-4 px-4 text-left">Mother Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr 
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">{index + 1}</td>
                    <td className="py-4 px-4">{student.roll_num}</td>
                    <td className="py-4 px-4">{student.first_name} {student.last_name}</td>
                    <td className="py-4 px-4">{student.class}</td>
                    <td className="py-4 px-4">{student.gender}</td>
                    <td className="py-4 px-4">{student.birth_date}</td>
                    <td className="py-4 px-4">{student.city}</td>
                    <td className="py-4 px-4">{student.address}</td>
                    <td className="py-4 px-4">{student.father_name}</td>
                    <td className="py-4 px-4">{student.father_cnic}</td>
                    <td className="py-4 px-4">{student.father_phone}</td>
                    <td className="py-4 px-4">{student.mother_phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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