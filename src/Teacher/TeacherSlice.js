import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { register, getAllTeachers } from "./TeacherApiCalls";
import { toast } from "react-toastify";
const initialState = {
  teachererror: null,
  teacherstatus: "idle",
  teacherarray: []
};

export const RegisterTeacher = createAsyncThunk(
  "teacher/register",
  async (UserDetails) => {
    try {
      const response = await register(UserDetails);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const GetAllTeachers = createAsyncThunk(
  "teacher/getTeachers",
  async () => {
    try {
      const response = await getAllTeachers();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(RegisterTeacher.pending, (state) => {
        state.teacherstatus = "pending";
      })
      .addCase(RegisterTeacher.fulfilled, (state, action) => {
        state.teacherstatus = "fulfilled";
        toast.success("Teacher Registered Successfully!");
      })
      .addCase(RegisterTeacher.rejected, (state, action) => {
        state.teacherstatus = "error";
        if (action.error.message == "Request failed with status code 400") {
          state.teachererror = "A teacher with this cnic already exists";
          toast.error(state.teachererror);
        }
      }) .addCase(GetAllTeachers.pending, (state) => {
        state.teacherstatus = "pending";
      })
      .addCase(GetAllTeachers.fulfilled, (state, action) => {
        state.teacherstatus = "fulfilled";
        state.teacherarray = action.payload;
      })
      .addCase(GetAllTeachers.rejected, (state, action) => {
        state.teacherstatus = "error";
      });

  },
});
export const selectStatus = (state) => state.teacher.teacherstatus;
export const selectError = (state) => state.teacher.teachererror;
export const selectTeacherArray = (state) =>state.teacher.teacherarray;

export default teacherSlice.reducer;
