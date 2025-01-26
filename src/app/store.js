import {combineReducers,configureStore} from "@reduxjs/toolkit";
import authReducer from "../auth/AuthSlice";
import studentReducer from "../Student/StudentSlice"
import teacherReducer from "../Teacher/TeacherSlice"
import testReducer from "../Test/TestSlice"
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const configStore={
    key:"root",
    version:1,
    storage
}
const reducers=combineReducers({
    auth:authReducer,
    student:studentReducer,
    teacher: teacherReducer,
    test: testReducer
});
const persistedReducer=persistReducer(configStore,reducers);
export const store=configureStore({
    reducer:persistedReducer,

})