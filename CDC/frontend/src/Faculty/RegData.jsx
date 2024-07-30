import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from "../Nav";
import "../App.css"

function RegData() {
  const [branch, setBranch] = useState('');
  const [students, setStudents] = useState([]);
  const [flag, setFlag] = useState(0);
  const [sem,setSem]=useState('');
  const [f,setFile]=useState('');

  const handleBranch = (e) => {
    setBranch(e.target.value);
    setStudents([]);
  };

  const handleSem = (e) => {
    setSem(e.target.value);
    
  };

  function handleSubmit(event) {
    setFlag(0);
    event.preventDefault();
    console.log(document.getElementById("year").value);
    console.log(branch);
    axios.post("http://localhost:4500/getRegData", {
      branch: branch,
      year: document.getElementById("year").value
    }).then(res => {
      console.log(res.data);
      if (res.data === "no year found" || res.data === "no branch found") {
        alert(res.data);
        setFlag(1);
      } else {
        setStudents(res.data);
      }
    });
  }

   function handleFile(file){
      setFile(file);
     setTimeout(handleReceipt,3000);
     
  }

  function handleReceipt(){
    console.log(f);
     axios.post("http://localhost:4500/Receipt",{
      sem:f
     }).then(res=>{
      console.log('redirected');
     })

  }
  return (
    <div>
      <Nav />
      <div className='rds'>
      <label>
        Select Branch:
        <select onChange={handleBranch}>
          <option value="select">Select branch</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECHANICAL">Mechanical</option>
          <option value="CIVIL">Civil</option>
          <option value="CHEMICAL">Chemical</option>
          <option value="METALLURGY">Metallurgy</option>
        </select>
      </label>
      <label>
        Select Year:
        <select id="year">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </label>
      <label>
                    Semester:
                    <select name='sem' value={sem} onChange={handleSem}>
                        <option value='1_1'>1_1</option>
                        <option value='1_2'>1_2</option>
                        <option  value='2_1'>2_1</option>
                        <option value='2_2'>2_2</option>
                        <option value='3_1'>3_1</option>
                        <option value='3_2'>3_2</option>
                        <option value='4_1'>4_1</option>
                        <option value='4_2'>4_2</option>
                    </select>
                </label>
      <button type='submit' onClick={handleSubmit}>Get Details</button>
      </div>
      {/* <div >
        {flag === 0 && students.length > 0 ? students.map(student => {
          return (
            <div key={student.RollNo} >
              <div>
              <label>
                Registration No:
              </label>
              <p>{student.RegNo}</p>
                </div>
              <div>
              <label>
                Roll No:
              </label>
              <p>{student.RollNo}</p>
              </div>
              <div>
              <label>
                Name:
              </label>
              <p>{student.Name}</p>
              </div>
              <div>
              <label>
                Email:
              </label>
              <p>{student.Email}</p>
              </div>
             
              <div>
                <h3>Files:</h3>
                 <a href={'backend/files/undefined_kotiiiiiiiii(1).pdf'} download>{student.FeeReceipts[sem]}</a>
              </div>
            </div>
          );
        }) : ""} */}
      {/* </div> */}
      <table>
        <thead>
          <th>Registration No.</th>
          <th>Roll No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Receipt</th>
        </thead>
        <tbody>
        {flag === 0 && students.length > 0 ? students.map(student => {
          return (
            <tr key={student.RollNo} >
             
              <td>{student.RegNo}</td>
                
              
              <td>{student.RollNo}</td>
              
              
              <td>{student.Name}</td>
              
              
              <td>{student.Email}</td>
              
             
              <td>
                 <a href={'backend/files/undefined_kotiiiiiiiii(1).pdf'} download>{student.FeeReceipts[sem]}</a>
                 </td>
            </tr>
          );
        }) : ""}
        </tbody>
      </table>
    </div>
  );
}

export default RegData;
















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function RegData() {
//   const [branch, setBranch] = useState('');
//   const [students,setStudents]=useState([]);
//   const [flag,setFlag]=useState(0);

//   const handleBranch = (e) => {
//     setBranch(e.target.value);
//     setStudents([]);
//   };

//   function handleSubmit(event){
//    setFlag(0);
//    event.preventDefault();
//    console.log(document.getElementById("year").value);
//    console.log(branch);
//    axios.post("http://localhost:4500/getRegData",{
//       branch:branch,
//       year:document.getElementById("year").value
//     }).then(res=>{
//          console.log(res.data);
//          if(res.data==="no year found" || res.data==="no branch found"){
//           alert(res.data);
//           setFlag(1);
//          }else{
//          setStudents(res.data);
//          }
//     });
    
    

//   }

//   return (
//     <div>
//       <label>
//         Select Branch:
//         <select onChange={handleBranch}>
//         <option value="select">Select branch</option>
//           <option value="CSE">CSE</option>
//           <option value="ECE">ECE</option>
//           <option value="EEE">EEE</option>
//           <option value="MECHANICAL">Mechanical</option>
//           <option value="CIVIL">Civil</option>
//           <option value="CHEMICAL">Chemical</option>
//           <option value="METALLURGY">Metallurgy</option>
//         </select>
//       </label>
//       <label>
//         Select Year:
//         <select id="year">
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//         </select>
//       </label>
//       <button type='submit' onClick={handleSubmit}>GetDetails</button>
//       <div>
//         {
//           flag==0 && students.length>0 ? students.map(student=>{
//            return <div>
                  
//                   <label>
//                     Registration No:
//                     <p>{student.RegNo}</p>
//                   </label>
//                   <label>
//                     Roll No:
//                     <p>{student.RollNo}</p>
//                   </label>
                 
//                   <label>
//                     Name:
//                     <p>{student.Name}</p>
//                   </label>
                 
//                   <label>
//                     Email:
//                     <p>{student.Email}</p>
//                   </label>
//               </div>
//           }):""
//         }
//       </div>
//     </div>
//   );
// }

// export default RegData;
