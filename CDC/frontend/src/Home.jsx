import React from "react";
import FacultyLogin from "./Faculty/FacultyLogin";
import Register from "./Student/Register";
import {useNavigate,Route,Routes,useLocation} from "react-router-dom";
import InternJob from "./Faculty/InternJob";
import Job from "./Faculty/Job";
import FacultyHome from "./Faculty/FacultyHome";
import Joblist from "./Joblist";
import RegData from "./Faculty/RegData";
import StudentHome from "./Student/StudentHome";
import StudentCDC from "./Student/StudentCDC";
import Reviews from "./Student/Reviews";
import Courosel from "./Courosel";
import Nav from "./Nav";
import "./App.css";
import MDForm from "./Student/MDForm";
import StudentLogin from "./Student/StudentLogin";
import MdData from "./Faculty/MdData"

function Home(){
     const navigate=useNavigate();
     const location=useLocation();
     function handleFaculty(){
        navigate("/Faculty/FacultyLogin");
     }

     function handleStudent(){
        navigate("/Student/StudentLogin");
     }
      return(
        <div>
        {
            location.pathname==="/"?<div>
                <Nav />
        <Courosel />
        <div className="hm">
        <button  className="hbtn" onClick={handleFaculty}>Faculty Login</button>
            <button className="hbtn" onClick={handleStudent}>Student Login</button> </div>
           
        </div>:""
        }
      

        <Routes>
            <Route path="/Faculty/FacultyLogin" element={<FacultyLogin from="Home" />}></Route>
            <Route path="/Faculty/Jobs/FacultyLogin" element={<FacultyLogin from="Joblist" />}></Route>
            <Route path="/Student/Register" element={<Register />}></Route>
            <Route path="/Faculty/InternJob" element={<InternJob />}></Route>
            <Route path="/Faculty/Job" element={<Job />}></Route>
            <Route path="/Faculty/FacultyHome" element={<FacultyHome />}></Route>
            <Route path="/Joblist" element={<Joblist />}></Route>
            <Route path='/Faculty/RegData' element={<RegData />} ></Route>
            <Route path="/Student/StudentHome" element={<StudentHome />}></Route>
            <Route path="/Student/StudentCDC" element={<StudentCDC />}></Route>
            <Route path="/Student/MDForm" element={<MDForm />}></Route>
           <Route path="/Student/StudentLogin" element={<StudentLogin />} ></Route>
            <Route path="/Student/AddStory" element={<Reviews />}></Route>
            <Route path="/Faculty/MdData" element={<MdData />}></Route>
        </Routes>
        </div>
      )
}

export default Home;