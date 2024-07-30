import React,{useState} from "react";
import Nav from  '../Nav';
import {Route,Routes,useNavigate,useLocation} from "react-router-dom";
import Axios from "axios";
import InternJob from "./InternJob";
import FacultyHome from "./FacultyHome";
import Job from "./Job";
import "../App.css";
import logo from "../nit-ap-logo.png"


function FacultyLogin(props){

  const [f,setF]=useState('');    
  const navigate= useNavigate();
  function CheckDetails(email,password){
    const emailpattern=/^\d{6}@teacher.nitandhra.ac.in$/;
    const i= emailpattern.test(email);
    console.log(i);
   if(i){
      return true;
   }
   return false;
  

    
}
    function handleSubmit(event){
    
        event.preventDefault();
        const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const check=CheckDetails(email,password);
    if(check){
    Axios.post("http://localhost:4500/checkFaculty",{
      Email:email,
      Password:password
    }).then(res=>{
      console.log(res.data);
      if(res.data==="exists"){
        setF(res.data);
      }else{
        alert(res.data);
      }
    })
    console.log(props.from)
    if(props.from==="Joblist"){
      if(f==="exists")
         navigate("/Faculty/Job");
    }else{
      if(f==="exists")
           navigate("/Faculty/FacultyHome");
    }
  }else{
    alert("enter valid email")
  }
       
    }
   return <div >
        <Nav />
        <div className="facl">
          <img src={logo} alt="logo"></img>
          <div  className="fl">
        <div className="fll">
      <label for="clgmail">EmailID:</label>
      <input id='email' type="email"  placeholder="Enter Email" required />
      </div>
      <div className="fll">
      <label for="Password">Password:</label>
      <input id='password' type="password" placeholder="Enter Password" required />
      </div>
       <button onClick={handleSubmit} type="submit">Login</button>
       </div>
        </div>
        

       <Routes>
        <Route path="/Faculty/FacultyHome" element={<FacultyHome />}></Route>
        <Route path="/Faculty/Job" element={<Job />}></Route>
      </Routes>
    </div>
}

export default FacultyLogin;