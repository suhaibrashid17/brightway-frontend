import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import {Route, Routes} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import { ToastContainer } from 'react-toastify'
import AdminDashboard from "./pages/AdminDashboard"
import CheckLogin from "./components/CheckLogin"


function App() {

  return (
    <>
      <Navbar/>
      <Routes>
             <Route path = "/" element={<HomePage></HomePage>} />
             <Route path = "/login" element={<LoginPage></LoginPage>} />
             <Route path="/dashboard" element = {<CheckLogin><AdminDashboard></AdminDashboard></CheckLogin>}/>
         </Routes>
         <ToastContainer/>

    </>
  )
}

export default App
