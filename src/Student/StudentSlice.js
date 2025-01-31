import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { register, getAllStudentsByClass, saveAttendance, fetchAttendance } from "./StudentApiCalls";
import { toast } from "react-toastify";
const initialState={
    studenterror:null,
    studentstatus:"idle",
    studentarray: [],  
    attendanceData: [],

}


export const RegisterStudent=createAsyncThunk(
    "student/register",
    async(UserDetails)=>{
        
        try{
            const response = await  register(UserDetails);
            return response;
        }
        catch(error)
        {
            throw error;
        }
    } 
)
export const GetAllStudentsByClass = createAsyncThunk(
  "student/getAllStudentsByClass",
  async (students_class) => {
    try {
      const response = await getAllStudentsByClass(students_class);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const SaveAttendance = createAsyncThunk(
  "student/saveAttendance",
  async (attendanceData) => {
    try {
      const response = await saveAttendance(attendanceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const FetchAttendance = createAsyncThunk(
  "student/fetchAttendance",
  async ({ class: studentsClass, month, year }) => {
    try {
      const response = await fetchAttendance(studentsClass, month + 1, year);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const studentSlice=createSlice({
    name:"studentSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(RegisterStudent.pending,(state)=>{
            state.studentstatus="pending";
        })
        .addCase(RegisterStudent.fulfilled,(state,action)=>{
            state.studentstatus="fulfilled";
            toast.success("Student Registered Successfully!");
        })
        .addCase(RegisterStudent.rejected,(state,action)=>{
            state.studentstatus="error";
            if (action.error.message == "Request failed with status code 400")
            {
                console.log("im here")
                state.studenterror= "A student with this roll number already exists";
                toast.error(state.studenterror);
            }
        })
        .addCase(GetAllStudentsByClass.pending, (state) => {
                state.studentstatus = "pending";
              })
              .addCase(GetAllStudentsByClass.fulfilled, (state, action) => {
                state.studentstatus = "fulfilled";
                state.studentarray = action.payload;
              })
              .addCase(GetAllStudentsByClass.rejected, (state, action) => {
                state.studentstatus = "error";
              })
              .addCase(SaveAttendance.pending, (state) => {
                state.studentstatus = "pending";
              })
              .addCase(SaveAttendance.fulfilled, (state) => {
                state.studentstatus = "fulfilled";
                toast.success("Attendance saved successfully!");
              })
              .addCase(SaveAttendance.rejected, (state, action) => {
                state.studentstatus = "error";
                toast.error("Failed to save attendance");
              })
              .addCase(FetchAttendance.pending, (state) => {
                state.studentstatus = "pending";
              })
              .addCase(FetchAttendance.fulfilled, (state, action) => {
                state.studentstatus = "fulfilled";
                state.attendanceData = action.payload;
              })
              .addCase(FetchAttendance.rejected, (state, action) => {
                state.studentstatus = "error";
                toast.error("Failed to fetch attendance");
              });
      
    }

})
export const selectStatus=(state)=>state.student.studentstatus;
export const selectError=(state)=>state.student.studenterror;
export const selectStudentArray = (state) =>state.teacher.studentarray;


export default studentSlice.reducer;