import React,{useState} from 'react';
import axios from "axios";
import Nav from "../Nav";
import { Alert } from 'bootstrap';


function MdData() {
    const [course,setCourse]=useState('');
    const [code,setCode]=useState('');
    const [data,setData]=useState([]);
    function handleCourse(e){
        setCourse(e.target.value);
    }
    // function handleCode(e){
    //     setCode(e.target.value);
    // }
    function handleSubmit(){
        
         axios.post("http://localhost:4500/getMd",{
            Course:course,
            Code:code
         }).then(res=>{
            console.log(res.data);
            if(res.data==="No Students Applied"){
              alert(res.data);
            }else{
            setData(res.data);
            }
         })
    }
  return (
    <div>
        <Nav />
        <div className='mdd'>
      <div className="form-group">
            <label htmlFor="course">Course:</label>
            <select id="course" name="course" value={course} onChange={handleCourse}>
              <option value="">Select Course</option>
              <option value="Course A">Course A</option>
              <option value="Course B">Course B</option>
              <option value="Course C">Course C</option>
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="courseCode">Course Code:</label>
            <select id="courseCode" name="courseCode" value={code} onChange={handleCode}>
              <option value="">Select Course Code</option>
              <option value="Code 1">Code 1</option>
              <option value="Code 2">Code 2</option>
              <option value="Code 3">Code 3</option>
            </select>
          </div> */}
          <button onClick={handleSubmit}>getData</button>
          </div>
          <table>
        <thead>
          <th>Registration No.</th>
          <th>Roll No.</th>
          <th>Email</th>
          <th>Branch</th>
          <th>Year</th>
          <th>CGPA</th>
         
        </thead>
        <tbody>
        { data.length > 0 ? data.map(std => {
          return (
            <tr key={std.rollNo} >
             
              <td>{std.regNo}</td>
                
              
              <td>{std.rollNo}</td>
              
              <td>{std.email}</td>
              <td>{std.branch}</td>
              <td>{std.year}</td>
              <td>{std.cgpa}</td>
             
            </tr>
          );
        }) : ""}
        </tbody>
      </table>
    </div>
  )
}

export default MdData
