import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate,Route,Routes} from "react-router-dom";
import FacultyLogin from './Faculty/FacultyLogin';
import Nav from "./Nav";

const JobDetails = () => {
  const [jobDetails, setJobs] = useState([]);
  const [jobD, setJobD] = useState([]);
  const navigate=useNavigate();
  const [f,setF]=useState(0);
  const [If,setIF]=useState(0);

  useEffect(() => {
    
    axios.get("http://localhost:4500/job-details")
      .then(res => {
        setJobs(res.data);
        setJobD(res.data); 
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
        
      });
  }, []); 

  function handleAdd(){
    navigate("/Faculty/Jobs/FacultyLogin");
  }
  function handleInternships(){
    
    setF(1);
    setIF(1);
    const internship=jobDetails.filter(x=>x.type==='Internship');
    setJobs("");
   
    setJobs(internship);
  }

  function handleJobs(){
    setF(1);
    
    const job=jobD.filter(x=>x.type==='Job');
    setJobs("");
   
    setJobs(job);
  }

  function handleSubmit(job,company){
    console.log(job + company);
    axios.post("http://localhost:4500/deleteJob",{
      Company:company,
      Job:job
    }).then(res=>{
      console.log(res.data);
      alert(res.data);
    })
}

  return (
    
    <div className='jl'>
      <Nav />
      <button className='add' onClick={handleAdd}>Add</button>
      <div className='btns'>
      <button  onClick={handleInternships}>Internships</button>
           <button onClick={handleJobs}>Jobs</button>
           </div>
      <h2>Current Jobs</h2>
      {f==1 && jobDetails.length>0?<div className='jobs'>{
      jobDetails.map((job, index) => (
        <div style={{"border":"solid 1px"}} key={index} className="joblist">
          <h3 >{job.CName}</h3>
          <p>Job Title: {job.job}</p>
          <p className='des' style={{ width: '250px', wordWrap: 'break-word' }}>Description: {job.descr}</p>
          <p>Eligibility: {job.eligibility}</p>
          <p>Salary: {job.Salary}</p>
          <p>Perks: {job.Perks}</p>
          <button onClick={()=>{
            handleSubmit(job.job,job.CName);
          }}>delete</button>
        </div>
      ))}</div>:f==1?"No jobs currently":""}
      <Routes>
        <Route path="/Faculty/Jobs/FacultyLogin" element={<FacultyLogin from="joblist" />}></Route>
      </Routes>
    </div>
  );
};

export default JobDetails;