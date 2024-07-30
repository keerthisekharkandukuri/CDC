import React from 'react';
import {useNavigate,Route,Routes} from "react-router-dom";
import Job from "./Job";
import Joblist from "../Joblist";
import RegData from './RegData';
import Nav from "../Nav";
import bcg from "../nitapout.jpg";
import MdData from "./MdData";

function FacultyHome(){
    const navigate=useNavigate();
    function handleJobs(){
        // navigate("/Faculty/Job")
        navigate("../Joblist");
    }

    function handleRegistrationdetails(){
        navigate("/Faculty/RegData");
    }

    function handleMD(){
      navigate("/Faculty/MdData");
    }
  return(
    <div >
        <Nav />
        <div >
        <div  className='fh'>
        <button onClick={handleJobs}>Job</button>
        <button onClick={handleRegistrationdetails}>Registered Students</button>
        <button onClick={handleMD}>Minor Degree Applications</button>
        </div>
        </div>
        <Routes>
             {/* <Route path='/Faculty/Job' element={<Job/>} ></Route> */}
             <Route path='../Joblist' element={<Joblist/>} ></Route>
             <Route path='/Faculty/RegData' element={<RegData />} ></Route>
             
        </Routes>
    </div>
  )
}
export default FacultyHome;