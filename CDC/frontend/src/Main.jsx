import React from "react";
import {Route,Routes,useNavigate,useLocation} from "react-router-dom";
import App from "./App";
import FacultyLogin from "./FacultyLogin";
import Nav from "./Nav";

function Main(){

    const navigate=useNavigate();
    const location=useLocation();

    function handleStudent(){
         navigate("/App");  
    }

    function handleFaculty(){
        navigate("/FacultyLogin");
    }
   return  <div>
     <Nav />
    {
         
        location.pathname==="/"?<div>
           
    <button onClick={handleStudent}>Student Portal</button>
    <button onClick={handleFaculty}>Faculty Portal</button>
            </div>:null
    }
   

    <Routes>
        <Route path="/App" element={<App />}></Route>
        <Route path="/FacultyLogin" element={<FacultyLogin />}></Route>
    </Routes>
    </div>
    

}

export default Main;