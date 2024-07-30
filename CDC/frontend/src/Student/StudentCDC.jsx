
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Route,Routes } from 'react-router-dom';
import Reviews from './Reviews';
import Nav from "../Nav";


function StudentCDC(){
    
       const [jobDetails, setJobDetails] = useState([]);
       const [Jobs, setJobs] = useState([]);
       const [reviews,setreviews]=useState([]);
       const navigate=useNavigate();
       const [sf,setSF]=useState(0);
       const [If,setIF]=useState(0);
       const [Jf,setJF]=useState(0);
       const [f,setF]=useState(0);
       const [comments,setComments]=useState([]);
       const [newcomment,setNewComment]=useState("");

  useEffect(() => {
    
    axios.get("http://localhost:4500/job-details")
      .then(res => {
        setJobDetails(res.data); 
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
        
      });
     
  }, []); 

  function handleInternships(){
    setIF(1);
    setSF(0);
    setF(1);
    const internship=jobDetails.filter(x=>x.type==='Internship');
    setJobs("");
    setJobs(internship);
  }

  function handleJobs(){
    setJF(1);
    setSF(0);
    setF(1);
    const job=jobDetails.filter(x=>x.type==='Job');
    setJobs("");
    setJobs(job);
  }

  function hii(){
    setSF(0);
    console.log("hii");
            navigate("/Student/AddStory");
  }
  function handleStories(){
    setSF(1);
    axios.get("http://localhost:4500/DisplayReviews").then(res=>{
      setreviews(res.data);
      console.log(res.data);
  }).catch(error => {
      console.error('Error fetching job details:', error);
      
    });
  }
  
  return (
    <div className='jl'>
      <Nav />
        <nav className='scdcb'>
            <button onClick={handleInternships}>Internships</button>
            <button onClick={handleJobs}>Jobs</button>

            <button onClick={handleStories}>Stories</button>
        </nav>
        {
          sf===0?<div>
             <h2>Current Jobs</h2>
      <div className='jobs'>
      {sf===0 && Jobs.length>0?Jobs.map((job, index) => (
        <div style={{"border":"solid 1px"}} key={index} className="joblist">
          <h3>{job.CName}</h3>
          <p>Job Title: {job.job}</p>
          <p>Description: {job.descr}</p>
          <p>Eligibility: {job.eligibility}</p>
          <p>Salary: {job.Salary}</p>
          <p>Perks: {job.Perks}</p>
        
        </div>
      )):f==0?"":"No jobs yet"}
      </div>
          </div>:""
        }
     

{sf==1?<div > <h2>Stories</h2>  <button className='add' onClick={hii}>Add story</button> </div> :""}
      
      <div className='jobs'>
     
       {
       sf==1?reviews.map((revieww, index) => (
        <div style={{"border":"solid 1px"}} key={index} className="review">
          
          <p>Name: {revieww.Name}</p>
          <p>Review On: {revieww.reviewOn}</p>
          <p>Company: {revieww.Company}</p>
         
          <p>Review: {revieww.Review}</p>
          
          <p>LinkedIn: {revieww.LinkedIn}</p>
         
        </div>

      )):""}
      </div>
      

      <Routes>
        <Route path="/Student/AddStory" element={<Reviews />}></Route>
      </Routes>
      
    </div>
  );
   
}

export default StudentCDC;