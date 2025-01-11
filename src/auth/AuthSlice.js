import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {login } from "./AuthApiCalls";
const initialState={
    loggedInUser:null,
    error:null,
    status:"idle",
}


export const Login=createAsyncThunk(
    "user/login",
    async(UserDetails)=>{
        
        try{
            const response = await  login(UserDetails);
            return response;
        }
        catch(error)
        {
            throw error;
        }
    } 
)
export const Logout=createAsyncThunk(
   "user/logout",
   ()=>{
      try{
        return 1;
      }
      catch(error){
        throw error;
      }
   }
)

const authSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
    

        .addCase(Login.pending,(state)=>{
            state.status="pending";
        })
        .addCase(Login.fulfilled,(state,action)=>{
            state.status="fulfilled";
            state.loggedInUser=action.payload;
        })
        .addCase(Login.rejected,(state,action)=>{
            state.status="error";
            state.error=action.error;    
        })
        .addCase(Logout.pending,(state)=>{
            state.status="pending";
        })
        .addCase(Logout.fulfilled,(state,action)=>{
            state.status="fulfilled";
            state.loggedInUser=null;
        })
        .addCase(Logout.rejected,(state,action)=>{
            state.status="error";
            state.error=action.error;
        })
    }

})
export const selectLoggedInUser=(state)=>state.auth.loggedInUser;
export const selectStatus=(state)=>state.auth.status;
export const selectError=(state)=>state.auth.error;

export default authSlice.reducer;