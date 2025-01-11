import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../auth/AuthSlice";
import { Navigate } from "react-router-dom";

function CheckLogin({children}){
    const user = useSelector(selectLoggedInUser);
    if(!user){
        return <Navigate to="/login"/>
    }
    return children;
}
export default CheckLogin;