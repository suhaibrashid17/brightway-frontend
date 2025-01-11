import { useState, useEffect, useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectStatus } from "../../Student/StudentSlice";
import { toast } from "react-toastify";
import { RegisterStudent } from "../../Student/StudentSlice";

function AddStudent() {
  const [FormPage, SetFormPage] = useState(0);

  const gender_list = ["Male", "Female", "LGBTQ+"];
  const class_list = [
    "5th",
    "6th",
    "7th",
    "8th",
    "pre-9th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];

  const [FirstName, SetFirstName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [Gender, SetGender] = useState("");
  const [DOB, SetDOB] = useState(null);
  const [City, SetCity] = useState("");
  const [Address, SetAddress] = useState("");
  const [FatherName, SetFatherName] = useState("");

  const [FatherCNIC, SetFatherCNIC] = useState("");
  const [FatherPhoneNumber, SetFatherPhoneNumber] = useState("");
  const [MotherPhoneNumber, SetMotherPhoneNumber] = useState("");
  const [Class, SetClass] = useState("");
  const [MonthlyFee, SetMonthlyFee] = useState();
  const [ProfilePicture, SetProfilePicture] = useState();
  const [RollNumber, SetRollNumber] = useState();

  const UserDetails = {
    first_name: FirstName,
    last_name: LastName,
    gender: Gender,
    birthdate: DOB,
    city: City,
    address: Address,
    roll_num: RollNumber,
    father_name: FatherName,
    father_cnic: FatherCNIC,
    father_phone: FatherPhoneNumber,
    mother_phone: MotherPhoneNumber,
    class: Class,
    monthly_fee: MonthlyFee,
    status: "active",
    pfp: ProfilePicture,
  };

  const dispatch = useDispatch();
  const SubmitData = async () => {
    if (
      FirstName == "" ||
      LastName == "" ||
      City == "" ||
      FatherName == "" ||
      Gender == "" ||
      DOB == null ||
      FatherCNIC == "" ||
      FatherPhoneNumber == "" ||
      MotherPhoneNumber == "" ||
      Address == "" ||
      !MonthlyFee ||
      RollNumber == ""
    ) {
      toast.error("Please fill out all mandatory fields to proceed!");
    } else {
      await dispatch(RegisterStudent(UserDetails));
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/2 h-4/5 bg-darkblue rounded-xl flex flex-col">
        <div className="h-32 w-full flex px-8 justify-between items-center">
          <h1
            onClick={() => {
              if (FormPage > 0) {
                SetFormPage(FormPage - 1);
              }
            }}
            className="text-5xl text-orange font-bold bg-midblue rounded-full w-16 h-16 flex items-center justify-center hover:scale-105 cursor-pointer"
          >
            &lt;
          </h1>
          <h1 className="text-2xl text-white font-bold">
            Student Registration
          </h1>
          <h1
            onClick={() => {
              if (FormPage < 2) {
                SetFormPage(FormPage + 1);
              }
            }}
            className="text-5xl text-orange font-bold bg-midblue rounded-full w-16 h-16 flex items-center justify-center hover:scale-105 cursor-pointer"
          >
            &gt;
          </h1>
        </div>

        <div className="h-full px-20 space-y-8 flex flex-col py-8 overflow-y-auto">
          {FormPage == 0 && (
            <>
              <label className="text-white font-bold text-lg">
                First Name <span className="text-lg text-orange">*</span>
              </label>
              <input
                value={FirstName}
                onChange={(e) => {
                  SetFirstName(e.target.value);
                }}
                type="text"
                className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              <label className="text-white font-bold text-lg">
                Last Name <span className="text-lg text-orange">*</span>
              </label>
              <input
                required
                value={LastName}
                onChange={(e) => {
                  SetLastName(e.target.value);
                }}
                type="text"
                className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              <label className="text-white font-bold text-lg">
                Roll Number <span className="text-lg text-orange">*</span>
              </label>
              <input
                required
                value={RollNumber}
                onChange={(e) => {
                  SetRollNumber(e.target.value);
                }}
                type="text"
                className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />

              <label className="text-white font-bold text-lg">
                City <span className="text-lg text-orange">*</span>
              </label>
              <input
                required
                value={City}
                onChange={(e) => {
                  SetCity(e.target.value);
                }}
                type="text"
                className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              <label className="text-white font-bold text-lg">
                Date of Birth <span className="text-lg text-orange">*</span>
              </label>
              <input
                type="date"
                required
                value={DOB}
                onChange={(e) => SetDOB(e.target.value)}
                className="text-white w-full h-10 bg-transparent border-b border-white text-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
            </>
          )}
          {FormPage == 1 && (
            <>
              <label className="text-white font-bold text-lg">
                Gender <span className="text-lg text-orange">*</span>
              </label>
              <select
                required
                value={Gender}
                onChange={(e) => SetGender(e.target.value)}
                className="text-white w-full h-8 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300 text-white"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {gender_list.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              <label className="text-white font-bold text-lg">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  SetProfilePicture(URL.createObjectURL(e.target.files[0]))
                } // Inline onChange handler for file input
                className="text-white w-full h-10 bg-transparent border-b border-white text-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
              />

              <label className="text-white font-bold text-lg">
                Father's Name <span className="text-lg text-orange">*</span>
              </label>
              <input
                required
                type="text"
                value={FatherName}
                onChange={(e) => {
                  SetFatherName(e.target.value);
                }}
                className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />

              <label className="text-white font-bold text-lg">
                Father's CNIC <span className="text-lg text-orange">*</span>
              </label>
              <input
                required
                type="text"
                value={FatherCNIC}
                onChange={(e) => {
                  SetFatherCNIC(e.target.value);
                }}
                className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              <label className="text-white font-bold text-lg">
                Father's Phone no.{" "}
                <span className="text-lg text-orange">*</span>
              </label>
              <input
                type="email"
                value={FatherPhoneNumber}
                onChange={(e) => {
                  SetFatherPhoneNumber(e.target.value);
                }}
                className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
            </>
          )}
          {FormPage == 2 && (
            <>
              <label className="text-white font-bold text-lg">
                Mother's Phone Number{" "}
                <span className="text-lg text-orange">*</span>
              </label>
              <input
                type="url"
                className="text-white w-full h-5 bg-transparent border-b border-white text-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
                value={MotherPhoneNumber}
                onChange={(e) => {
                  SetMotherPhoneNumber(e.target.value);
                }}
              />

              <label className="text-white font-bold text-lg">
                Address <span className="text-lg text-orange">*</span>
              </label>
              <input
                type="url"
                className="text-white w-full h-5 bg-transparent border-b border-white text-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
                value={Address}
                onChange={(e) => {
                  SetAddress(e.target.value);
                }}
              />
              <label className="text-white font-bold text-lg">
                Class <span className="text-lg text-orange">*</span>
              </label>
              <select
                required
                value={Class}
                onChange={(e) => SetClass(e.target.value)}
                className="text-white w-full h-8 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300 text-white"
              >
                <option value="" disabled>
                  Select Class
                </option>
                {class_list.map((class_item, index) => (
                  <option key={index} value={class_item}>
                    {class_item}
                  </option>
                ))}
              </select>
              <label className="text-white font-bold text-lg">
                Monthly Fee <span className="text-lg text-orange">*</span>
              </label>
              <input
                type="url"
                className="text-white w-full h-5 bg-transparent border-b border-white text-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
                value={MonthlyFee}
                onChange={(e) => {
                  SetMonthlyFee(e.target.value);
                }}
              />
              <button
                className="w-full rounded-xl bg-orange text-white font-bold text-2xl p-2 py-3 hover:scale-105 cursor-pointer"
                onClick={() => SubmitData()}
              >
                Submit
              </button>
            </>
          )}

          {FormPage == 3 && <></>}
        </div>
      </div>
    </div>
  );
}
export default AddStudent;
