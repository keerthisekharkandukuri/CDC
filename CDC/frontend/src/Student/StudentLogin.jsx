import React,{useState} from "react";
import Nav from  '../Nav';
import {Route,Routes,useNavigate} from "react-router-dom";
import axios from "axios";
import "../App.css";
import logo from "../nit-ap-logo.png";
import StudentHome from "./StudentHome";


function FacultyLogin(props){

   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");

  const navigate= useNavigate();

  function handleEmail(e){
    setEmail(e.target.value)
  }
  function handlePassword(e){
    setPassword(e.target.value);
  }

  
function CheckDetails(){
    const emailpattern=/^[12345678]2[0123][12](0[1-9]|[1-6][0-9]|7[0-5])@student.nitandhra.ac.in$/;
    const i= emailpattern.test(email);
    console.log(i);
   if(i){
      return true;
   }
   return false;
  

    
}

    function handleSubmit(event){
        event.preventDefault();
        const check=CheckDetails();
        if(check){
    axios.post("http://localhost:4500/checkStudent",{
      Email:email,
      Password:password
    }).then(res=>{
      console.log(res.data);
      if(res.data==="exists"){
         navigate("/Student/StudentHome",{state:{email:email}});
      }else{
        alert(res.data);
      }
    })
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
      <input onChange={handleEmail} id='email' type="email"  placeholder="Enter Email" />
      </div>
      <div className="fll">
      <label for="Password">Password:</label>
      <input onChange={handlePassword} id='password' type="password" placeholder="Enter Password" />
      </div>
       <button onClick={handleSubmit} type="submit">Login</button>
       </div>
        </div>
        

       <Routes>
        <Route path="/Student/StudentHome" element={<StudentHome email={email} />}></Route>
      </Routes>
    </div>
}

export default FacultyLogin;