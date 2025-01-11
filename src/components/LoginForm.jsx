import { Navigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Login, selectError, selectLoggedInUser, selectStatus } from '../auth/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';
function LoginForm() {
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const user = useSelector(selectLoggedInUser);
    const [ReqSent, SetReqSent] = useState(false);
    const UserDetails = {
        "user": Email,
        "password": Password
    }
    const LoginUser = async () => {
        if (Password == "") {
            toast.error("Password Field is Empty!")
        }
        if (Email != "") {
            await dispatch(Login(UserDetails));
            SetReqSent(true);
        }
        else {
            toast.error("Enter a Valid Username!")
        }
    }

    useEffect(() => {
        if (error && ReqSent) {
          toast.error("Invalid username or password");
        }
      }, [error, ReqSent]);
    return (
        <div className="flex flex-col space-y-16 items-center w-full h-full">
            <h1 className="text-midblue text-5xl font-bold">Login</h1>
            <div className="flex flex-col space-y-8">

                <div>
                    <h1 className="text-lg text-darkblue font-bold">Username</h1>
                    <input
                        required
                        value={Email}
                        onChange={(e) => { SetEmail(e.target.value) }}
                        className="w-96 h-10 bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-300"
                    />         </div>
                <div>
                    <h1 className="text-lg text-darkblue font-bold">Password</h1>
                    <input
                        type="password"
                        value={Password}
                        onChange={(e) => { SetPassword(e.target.value) }}
                        required
                        className="w-96 h-10 bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-300"
                    />         </div>

            </div>
            {
                !(status === "pending") && (
                    <button className="bg-darkblue text-white font-bold text-2xl rounded-xl px-20 py-4 cursor-pointer hover:opacity-70 hover:scale-105" onClick={() => LoginUser()}>Login</button>
                )
            }
            {
                (status === "pending") && (
                    <button className="bg-darkblue text-white font-bold text-2xl rounded-xl px-20 py-4 cursor-pointer hover:opacity-70 hover:scale-105" onClick={() => LoginUser()}><MoonLoader></MoonLoader>Login</button>
                )
                
            }
            {
                user && <Navigate to="/dashboard"/>
            }
          
        </div>
    )
}
export default LoginForm