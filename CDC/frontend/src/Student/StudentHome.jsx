import React from "react";
import {useNavigate,Route,Routes,useLocation} from "react-router-dom";
import Register from "./Register";
import StudentCDC from "./StudentCDC";
import Nav from "../Nav";
import MDForm from "./MDForm";

function StudentHome(props){
    const location=useLocation();
    const navigate=useNavigate();
    const {email}=location && location.state?location.state:"";
    console.log(email);
    function handleRegister(){
           navigate("/Student/Register");
           console.log(props.email);
    }

    function handleCDC(){
        navigate("/Student/StudentCDC")
    }

    function handleMD(){
        navigate("/Student/MDForm",{state:{email:email}})
    }

    return <div>
        <Nav />
        <div className="fh">
        <button onClick={handleRegister}>Sem Registration</button>
        <button onClick={handleCDC}>CDC</button>
        <button onClick={handleMD}>Minor Degree</button>
        </div>
      


        <Routes>
            <Route path="/Student/Register" element={<Register />}></Route>
            <Route path="/Student/StudentCDC" element={<StudentCDC />}></Route>
        </Routes>
    </div>


}
export default StudentHome;