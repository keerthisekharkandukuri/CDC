import React, { useState } from 'react';
import '../App.css';
import axios from "axios";
import {useLocation} from "react-router-dom";
import Nav from "../Nav";

function MDForm() {
    const location=useLocation();
    const {email}=location && location.state?location.state:"";
  const [formData, setFormData] = useState({
    rollNo: '',
    regNo: '',
    email: '',
    branch: '',
    year: '',
    course: '',
   
    cgpa: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(email===formData.email){
        axios.post("http://localhost:4500/MD",{
            form:formData
        }).then(res=>{
            alert(res.data);
        })
        setFormData({
            rollNo: '',
            regNo: '',
            email: '',
            branch: '',
            year: '',
            course: '',
            
            cgpa: ''
        });
    }else{
        alert("Enter your credentials");
    }
   
  };

  return (
    <div className='rev'>
        <Nav />
      <h2>Minor Degree</h2>
      
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rollNo">Roll No:</label>
            <input type="number" id="rollNo" name="rollNo" value={formData.rollNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="regNo">Reg No:</label>
            <input type="number" id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="branch">Branch:</label>
            <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="course">Course:</label>
            <select id="course" name="course" value={formData.course} onChange={handleChange}>
              <option value="">Select Course</option>
              <option value="Course A">Course A</option>
              <option value="Course B">Course B</option>
              <option value="Course C">Course C</option>
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="courseCode">Course Code:</label>
            <select id="courseCode" name="courseCode" value={formData.courseCode} onChange={handleChange}>
              <option value="">Select Course Code</option>
              <option value="Code 1">Code 1</option>
              <option value="Code 2">Code 2</option>
              <option value="Code 3">Code 3</option>
            </select>
          </div> */}
          <div className="form-group">
            <label htmlFor="cgpa">CGPA:</label>
            <input type="number" id="cgpa" name="cgpa" value={formData.cgpa} onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    
  );
}

export default MDForm;