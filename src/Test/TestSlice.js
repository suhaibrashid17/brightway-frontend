import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { 
  createTest, 
  getTestsByClass, 
  saveTestMarks,
  getTestDetails 
} from "./TestApiCalls";

const initialState = {
  tests: [],
  currentTest: null,
  status: "idle",
  error: null,
};

export const createNewTest = createAsyncThunk(
  "test/create",
  async ({ test_id, class: className }) => {
    try {
      const response = await createTest(test_id, className);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to create test";
    }
  }
);

export const fetchTestsByClass = createAsyncThunk(
  "test/fetchByClass",
  async (className) => {
    try {
      const response = await getTestsByClass(className);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to fetch tests";
    }
  }
);

export const saveMarks = createAsyncThunk(
  "test/saveMarks",
  async ({ test_id, className, marksData }) => {
    try {
      const response = await saveTestMarks(test_id, className, marksData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to save marks";
    }
  }
);

export const fetchTestDetails = createAsyncThunk(
  "test/fetchDetails",
  async ({ test_id, className }) => {
    try {
       console.log(className)
      const response = await getTestDetails(test_id, className);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to fetch test details";
    }
  }
);

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewTest.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createNewTest.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tests.push(action.payload);
        toast.success("Test created successfully!");
      })
      .addCase(createNewTest.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchTestsByClass.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchTestsByClass.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tests = action.payload;
      })
      .addCase(fetchTestsByClass.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(saveMarks.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(saveMarks.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.tests.findIndex(t => t.test_id === action.payload.test_id);
        if (index >= 0) state.tests[index] = action.payload;
        toast.success("Marks saved successfully!");
      })
      .addCase(saveMarks.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchTestDetails.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchTestDetails.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.currentTest = action.payload;
      })
      .addCase(fetchTestDetails.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
        toast.error(action.error.message);
      });
  }
});

export const selectTests = (state) => state.test.tests;
export const selectTestStatus = (state) => state.test.status;
export const selectCurrentTest = (state) => state.test.currentTest;

export default testSlice.reducer;