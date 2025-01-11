import { useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, selectStatus } from "../../auth/AuthSlice";
import { toast } from "react-toastify";

function AddTeacher() {
    const [FormPage, SetFormPage] = useState(0);
   
    const gender_list = ["Male", "Female", "LGBTQ+"]
    const status_list = ["active", "inactive"]
    const [FirstName, SetFirstName] = useState("");
    const [LastName, SetLastName] = useState("");
    const [Gender, SetGender] = useState("");
    const [DOB, SetDOB] = useState(null);
    const [City, SetCity] = useState("");
    const [Address, SetAddress] = useState("");
    const [ProfilePicture, SetProfilePicture] = useState();

    const [CNIC, SetCNIC] = useState("");
    const[PhoneNumber, SetPhoneNumber] = useState("");
    const [Salary, SetSalary] = useState();
    const user = useSelector(selectLoggedInUser);
    const status = useSelector(selectStatus);
    const UserDetails = {
        "first_name": FirstName,
        "last_name": LastName,
        "gender": Gender,
        "birthdate": DOB,
        "city": City,
        "address": Address,
        "cnic" : CNIC,
        "phone_no" : PhoneNumber,
        "salary" : Salary,
        "status": "active",
        "pfp" : ProfilePicture
    }

    const dispatch = useDispatch();
    const SubmitData = async() => {
       if(FirstName == "" || LastName == ""|| City == "" || FatherName == "" || Gender == "" || DOB == null || CNIC == "" || PhoneNumber == "" || !Salary){
        toast.error("Please fill out all mandatory fields to proceed!")
       }
    }
    return (
        
        <div className="w-full h-full flex items-center justify-center">
          
            <div className="w-1/2 h-4/5 bg-darkblue rounded-xl flex flex-col">
                <div className="h-32 w-full flex px-8 justify-between items-center">
                    <h1 onClick={() => { if (FormPage > 0) { SetFormPage(FormPage - 1) } }} className="text-5xl text-orange font-bold bg-midblue rounded-full w-16 h-16 flex items-center justify-center hover:scale-105 cursor-pointer">&lt;</h1>
                    <h1 className="text-2xl text-white font-bold">Teacher Registration</h1>
                    <h1 onClick={() => { if (FormPage < 2) { SetFormPage(FormPage + 1) } }} className="text-5xl text-orange font-bold bg-midblue rounded-full w-16 h-16 flex items-center justify-center hover:scale-105 cursor-pointer">&gt;</h1>

                </div>

                <div className="h-full px-20 space-y-8 flex flex-col py-16 overflow-y-auto">                    
                {FormPage == 0 && (<>
                    <label className="text-white font-bold text-lg">
                        First Name  <span className="text-lg text-orange">*</span>
                    </label>
                    <input value={FirstName} onChange={(e) => { SetFirstName(e.target.value) }} type="text" className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300" />
                    <label className="text-white font-bold text-lg">
                        Last Name  <span className="text-lg text-orange">*</span>
                    </label>
                    <input required value={LastName} onChange={(e) => { SetLastName(e.target.value) }} type="text" className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300" />
                    
                    <label className="text-white font-bold text-lg">
                        City  <span className="text-lg text-orange">*</span>
                    </label>
                    <input required value={City} onChange={(e) => { SetCity(e.target.value) }} type="text" className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300" />
                    <label className="text-white font-bold text-lg">
                            Date of Birth  <span className="text-lg text-orange">*</span>
                        </label>
                        <input
                            type="date"
                            required
                            value={DOB}
                            onChange={(e) => SetDOB(e.target.value)}
                            className="text-white w-full h-10 bg-transparent border-b border-white text-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
                        />
                   
                    </>
                        
                
                )
                }
                    {FormPage == 1 && (<>

                        <label className="text-white font-bold text-lg">
                            Gender  <span className="text-lg text-orange">*</span>
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
                            onChange={(e) => SetProfilePicture(URL.createObjectURL(e.target.files[0]))} // Inline onChange handler for file input
                            className="text-white w-full h-10 bg-transparent border-b border-white text-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
                        />

                        <label className="text-white font-bold text-lg">
                            CNIC  <span className="text-lg text-orange">*</span>
                        </label>
                        <input required  type="text" value={CNIC} onChange={(e) => { SetCNIC(e.target.value) }} className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300" />
                       
                        
                        <label className="text-white font-bold text-lg">
                            Phone Number  <span className="text-lg text-orange">*</span>
                        </label>
                        <input required  type="text" value={PhoneNumber} onChange={(e) => { SetPhoneNumber(e.target.value) }} className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300" />
                       
                    </>)
                    }
                 
                {
                    FormPage == 2 && (
                        <>
                         <label className="text-white font-bold text-lg">
                                    Salary <span className="text-lg text-orange">*</span>
                                </label>
                                <input type="text" value={Salary} onChange={(e) => { SetSalary(e.target.value) }} className="text-white w-full h-5 bg-transparent border-b border-white focus:outline-none focus:border-blue-500 transition-all duration-300" />

                                <label className="text-white font-bold text-lg">
                                    Address <span className="text-lg text-orange">*</span>
                                </label>
                                <input
                                    type="url"
                                    className="text-white w-full h-5 bg-transparent border-b border-white text-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
                                    value={Address}
                                    onChange={(e) => { SetAddress(e.target.value) }}
                                />

                              
                                <button className="w-full rounded-xl bg-orange text-white font-bold text-2xl p-2 py-3 hover:scale-105 cursor-pointer" onClick={()=>SubmitData()}>Submit</button>


                        </>
                    )
                }
                

                </div>
            </div>

        </div>
    )
}
export default AddTeacher