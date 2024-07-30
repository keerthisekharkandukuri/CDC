import React from "react";
import logo from "./nit-ap-logo.png";
import "./App.css";

function Nav(){
    return(
        <div className="nav">
           <div className="nav1">
            <img src={logo} alt="nitap"/>
            <h1>NIT ANDHRA PRADESH</h1>
          </div>
         
         <div className="nav2">
            <h2>CAREER DEVELOPMENT CENTER</h2>
         </div>
         
         
          

        </div>
        
    )
}
export default Nav;