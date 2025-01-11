import { useDispatch, useSelector } from "react-redux"
import { Logout, selectLoggedInUser } from "../auth/AuthSlice"

function Navbar(){
     const user = useSelector(selectLoggedInUser);
     const dispatch = useDispatch();
     const LogoutUser = async() =>{
           await dispatch(Logout());
     }
    return(
           <div className={`bg-darkblue w-screen h-20 flex items-center ${user ? "justify-between px-10" : ""}` }>
                <div className="flex flex-row p-8 items-center">
                <img className = "h-14" src = "/"></img>
                <h1 className="text-2xl text-white font-bold p-3">Brightway</h1>
                </div>
                {
                   user&& <span className="hover:underline hover:opactiy-70 cursor-pointer text-white" onClick={()=>LogoutUser()}>Logout</span>
                }
                 
           </div>
    
    )
    }
    export default Navbar