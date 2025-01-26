import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllStudentsByClass } from "../../Student/StudentSlice";
import {
  createNewTest,
  fetchTestsByClass,
  saveMarks,
  selectTests,
  selectTestStatus,
  fetchTestDetails,
  selectCurrentTest,
} from "../../Test/TestSlice";

const ResultRecords = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [navigationStack, setNavigationStack] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTestName, setNewTestName] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [students, setStudents] = useState([]);
  const [subjectTotalMarks, setSubjectTotalMarks] = useState({});
  const [marks, setMarks] = useState({});

  const dispatch = useDispatch();
  const tests = useSelector(selectTests);
  const testStatus = useSelector(selectTestStatus);
  const testDetails = useSelector(selectCurrentTest);

  const classes = ["Junior", "Pre-9th", "9th", "10th", "11th", "12th"];
  const juniorClasses = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const subjectMapping = {
    Junior: [
      "English (Literature)",
      "English (Grammar)",
      "Mathematics",
      "Science",
      "Urdu (Literature)",
      "Urdu (Grammar)",
      "Social Studies",
      "Islamiyat",
    ],
    "Pre-9th": [
      "Computer",
      "Biology",
      "English",
      "Urdu",
      "Mathematics",
      "Islamiyat",
      "Pakistan Studies",
    ],
    "9th": [
      "Computer",
      "Biology",
      "English",
      "Urdu",
      "Mathematics",
      "Islamiyat",
      "Pakistan Studies",
    ],
    "10th": [
      "Computer",
      "Biology",
      "English",
      "Urdu",
      "Mathematics",
      "Islamiyat",
      "Pakistan Studies",
    ],
    "11th": [
      "Biology",
      "Chemistry",
      "Computer",
      "Mathematics",
      "English",
      "Urdu",
      "Islamiyat",
    ],
    "12th": [
      "Biology",
      "Chemistry",
      "Computer",
      "Mathematics",
      "English",
      "Urdu",
      "Pakistan Studies",
    ],
  };

  useEffect(() => {
    if (selectedTest) {
      dispatch(
        fetchTestDetails({
          test_id: selectedTest.test_id,
          className: selectedClass,
        })
      );
    }
  }, [selectedTest, dispatch, selectedClass]);

  useEffect(() => {
    if (testDetails) {
      const newMarks = {};
      const newTotalMarks = {};

      testDetails.test_records.forEach((record) => {
        record.subjects.forEach((subject) => {
          if (!newTotalMarks[subject.subjectName]) {
            newTotalMarks[subject.subjectName] = subject.totalMarks || "-";
          }

          if (!newMarks[record.roll_num]) {
            newMarks[record.roll_num] = {};
          }

          newMarks[record.roll_num][subject.subjectName] = {
            obtainedMarks: subject.obtainedMarks?.toString() || "-",
            totalMarks: subject.totalMarks?.toString() || "-",
          };
        });
      });

      setMarks(newMarks);
      setSubjectTotalMarks(newTotalMarks);
    }
  }, [testDetails]);

  useEffect(() => {
    if (selectedClass && selectedClass !== "Junior") {
      const fetchData = async () => {
        const studentsResponse = await dispatch(
          GetAllStudentsByClass(selectedClass)
        );
        const fetchedStudents = studentsResponse.payload || [];
        setStudents(fetchedStudents);

        dispatch(fetchTestsByClass(selectedClass));

        const subjects = subjectMapping[selectedClass] || [];
        const initialMarks = {};

        fetchedStudents.forEach((student) => {
          initialMarks[student.roll_num] = {};
          subjects.forEach((subject) => {
            initialMarks[student.roll_num][subject] = {
              obtainedMarks: "",
              totalMarks: "",
            };
          });
        });

        setMarks(initialMarks);
      };

      fetchData();
    }
  }, [selectedClass, dispatch]);

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

  const handleCreateTest = async () => {
    if (newTestName.trim()) {
      try {
        await dispatch(
          createNewTest({
            test_id: newTestName.trim(),
            class: selectedClass,
          })
        ).unwrap();
        setIsModalOpen(false);
        setNewTestName("");
      } catch (error) {
        toast.error("Test creation failed: " + error.message);
      }
    }
  };

  const StudentMarksTable = React.memo(({ test }) => {
    const subjects = subjectMapping[selectedClass] || [];
    const inputRefs = useRef({});
    const [expandedSections, setExpandedSections] = useState({
      marksheet: false,
      subjectStats: false,
      studentStats: false,
    });

    const toggleSection = (section) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

    const handleMarkChange = (rollNum, subject, value) => {
      const totalMarks = subjectTotalMarks[subject];
      if (totalMarks && (value === "" || (Number(value) <= Number(totalMarks)))) {
        setMarks((prev) => ({
          ...prev,
          [rollNum]: {
            ...prev[rollNum],
            [subject]: {
              obtainedMarks: value,
              totalMarks: totalMarks,
            },
          },
        }));
      } else if (!totalMarks) {
        toast.error(`Total marks for ${subject} are not specified.`);
      } else {
        toast.error(`Obtained marks cannot exceed total marks for ${subject}.`);
      }
    };

    const handleTotalMarksChange = (subject, value) => {
      setSubjectTotalMarks((prev) => ({
        ...prev,
        [subject]: value,
      }));
    };

    const handleSaveMarks = () => {
      let isValid = true;

      // Check if all subjects have total marks specified
      subjects.forEach((subject) => {
        if (!subjectTotalMarks[subject]) {
          isValid = false;
          toast.error(`Total marks for ${subject} are not specified.`);
        }
      });

      // Check if obtained marks are valid
      Object.entries(marks).forEach(([rollNum, studentMarks]) => {
        Object.entries(studentMarks).forEach(([subject, mark]) => {
          if (mark.obtainedMarks && Number(mark.obtainedMarks) > Number(mark.totalMarks)) {
            isValid = false;
            toast.error(`Obtained marks for ${subject} exceed total marks for roll number ${rollNum}.`);
          }
        });
      });

      if (!isValid) return;

      const marksData = Object.entries(marks).map(([roll_num, subjects]) => ({
        roll_num,
        subjects: Object.entries(subjects).map(([subjectName, marks]) => ({
          subjectName,
          obtainedMarks: Number(marks.obtainedMarks) || 0,
          totalMarks: Number(subjectTotalMarks[subjectName]) || 0,
        })),
      }));

      dispatch(
        saveMarks({
          test_id: test.test_id,
          className: selectedClass,
          marksData,
        })
      );
    };

    const SubjectWiseStats = () => {
      const calculateSubjectStats = (subject) => {
        const marksList = students.map((student) => {
          const mark = marks[student.roll_num]?.[subject]?.obtainedMarks;
          return parseFloat(mark) || 0;
        });

        const total = marksList.reduce((sum, m) => sum + m, 0);
        const average = marksList.length > 0 ? total / marksList.length : 0;
        const max = Math.max(...marksList);
        const min = Math.min(...marksList);

        return {
          average: average.toFixed(2),
          max: max.toFixed(2),
          min: min.toFixed(2),
          totalMarks: subjectTotalMarks[subject] || "-",
        };
      };

      return (
        <div className="mt-6 border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("subjectStats")}
            className="w-full p-4 bg-midblue text-white flex justify-between items-center"
          >
            <h3 className="text-xl font-bold">Subject-wise Statistics</h3>
            {expandedSections.subjectStats ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSections.subjectStats && (
            <div className="bg-white p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => {
                  const stats = calculateSubjectStats(subject);
                  return (
                    <div key={subject} className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-bold text-lg mb-2">{subject}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>Average:</div>
                        <div className="font-bold">{stats.average}</div>
                        <div>Highest:</div>
                        <div className="font-bold">{stats.max}</div>
                        <div>Lowest:</div>
                        <div className="font-bold">{stats.min}</div>
                        <div>Total Marks:</div>
                        <div className="font-bold">{stats.totalMarks}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    };

    const StudentWiseStats = () => {
      const studentStats = students
        .map((student) => {
          let totalObtained = 0;
          let totalPossible = 0;

          subjects.forEach((subject) => {
            const obtained = parseFloat(marks[student.roll_num]?.[subject]?.obtainedMarks) || 0;
            const total = parseFloat(subjectTotalMarks[subject]) || 0;
            totalObtained += obtained;
            totalPossible += total;
          });

          const percentage = totalPossible > 0 ? ((totalObtained / totalPossible) * 100).toFixed(2) : 0;

          return {
            ...student,
            totalObtained,
            totalPossible,
            percentage,
          };
        })
        .sort((a, b) => b.totalObtained - a.totalObtained);

      return (
        <div className="mt-6 border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("studentStats")}
            className="w-full p-4 bg-midblue text-white flex justify-between items-center"
          >
            <h3 className="text-xl font-bold">Student-wise Statistics</h3>
            {expandedSections.studentStats ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSections.studentStats && (
            <div className="bg-white p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-midblue text-white">
                      <th className="border p-2">Rank</th>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Roll No.</th>
                      <th className="border p-2">Total Obtained</th>
                      <th className="border p-2">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentStats.map((student, index) => (
                      <tr key={student.roll_num} className="hover:bg-gray-100">
                        <td className="border p-2 text-center">{index + 1}</td>
                        <td className="border p-2">{student.first_name}</td>
                        <td className="border p-2 text-center">{student.roll_num}</td>
                        <td className="border p-2 text-center">
                          {student.totalObtained} / {student.totalPossible}
                        </td>
                        <td className="border p-2 text-center">{student.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{test.test_id} - Marks Sheet</h2>
          <button
            onClick={handleSaveMarks}
            className="px-4 py-2 bg-orange text-white rounded-lg"
          >
            {testStatus === "pending" ? "Saving..." : "Save Test"}
          </button>
        </div>

        <div className="border rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => toggleSection("marksheet")}
            className="w-full p-4 bg-midblue text-white flex justify-between items-center"
          >
            <h3 className="text-xl font-bold">Marks Entry Table</h3>
            {expandedSections.marksheet ? <ChevronUp /> : <ChevronDown />}
          </button>
          {expandedSections.marksheet && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-midblue text-white">
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">Roll Number</th>
                    {subjects.map((subject) => (
                      <th key={subject} className="border p-2">
                        {subject}
                        <input
                          type="number"
                          placeholder="Total Marks"
                          value={subjectTotalMarks[subject] || ""}
                          onChange={(e) => {
                            handleTotalMarksChange(subject, e.target.value);
                            inputRefs.current[subject]?.focus();
                          }}
                          className="w-full mt-2 px-2 py-1 border rounded-lg text-sm text-darkblue bg-white"
                          ref={(el) => (inputRefs.current[subject] = el)}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={`row-${student.roll_num}`} className="hover:bg-gray-100">
                      <td className="border p-2">{student.first_name}</td>
                      <td className="border p-2">{student.roll_num}</td>
                      {subjects.map((subject) => (
                        <td key={`cell-${student.roll_num}-${subject}`} className="border p-2">
                          <input
                            type="number"
                            placeholder="Obtained Marks"
                            value={marks[student.roll_num]?.[subject]?.obtainedMarks || ""}
                            onChange={(e) =>
                              handleMarkChange(student.roll_num, subject, e.target.value)
                            }
                            className="w-full text-center border-none bg-transparent text-black"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <SubjectWiseStats />
        <StudentWiseStats />
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Test</h2>
            <input
              type="text"
              placeholder="Enter Test ID"
              value={newTestName}
              onChange={(e) => setNewTestName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTest}
                className="px-4 py-2 bg-orange text-white rounded-lg"
              >
                {testStatus === "pending" ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTest ? (
        <div>
          <button
            onClick={() => setSelectedTest(null)}
            className="flex items-center px-4 py-2 bg-midblue text-white rounded-lg hover:bg-orange transition-colors mb-4"
          >
            <ChevronLeft className="mr-2" size={20} />
            Back to Tests
          </button>
          <StudentMarksTable test={selectedTest} />
        </div>
      ) : selectedClass && selectedClass !== "Junior" ? (
        <div>
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 bg-midblue text-white rounded-lg hover:bg-orange transition-colors mb-4"
          >
            <ChevronLeft className="mr-2" size={20} />
            Back to Classes
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {tests.map((test, index) => (
              <div
                key={index}
                onClick={() => setSelectedTest(test)}
                className="w-64 h-40 rounded-lg bg-white hover:bg-gray-100 transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
              >
                <span className="text-2xl font-bold text-darkblue mb-2">
                  {test.test_id}
                </span>
                <span className="text-gray-600 text-sm">Click to view details</span>
              </div>
            ))}
            <div
              onClick={() => setIsModalOpen(true)}
              className="w-64 h-40 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
            >
              <Plus className="text-gray-600" size={48} />
              <span className="text-gray-600 text-sm mt-2">Create New Test</span>
            </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {juniorClasses.map((class_, index) => (
              <div
                key={index}
                onClick={() => handleClassClick(class_)}
                className="w-64 h-40 rounded-lg bg-midblue hover:bg-orange transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
              >
                <span className="text-3xl font-bold text-white mb-2">{class_}</span>
                <span className="text-white text-sm">View Tests</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-darkblue mb-8 text-center md:text-left">
            Test Records
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {classes.map((class_, index) => (
              <div
                key={index}
                onClick={() => handleClassClick(class_)}
                className="w-64 h-40 rounded-lg bg-midblue hover:bg-orange transition-colors duration-300 cursor-pointer shadow-lg flex flex-col items-center justify-center p-4"
              >
                <span className="text-3xl font-bold text-white mb-2">{class_}</span>
                <span className="text-white text-sm">View Tests</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultRecords;