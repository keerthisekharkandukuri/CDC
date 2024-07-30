import React, { useState } from 'react';
import axios from 'axios';
import Nav from "../Nav";
import formimg from "../form.jpg"

function Job() {
  const [formData, setFormData] = useState({
    CName: '',
    job: '',
    type:'',
    descr: '',
    eligibility: '',
    Salary: '',
    Perks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleSubmit(){
    axios.post("http://localhost:4500/job", {
      CName: formData.CName,
      job: formData.job,
      type:formData.type,
      descr: formData.descr,
      eligibility: formData.eligibility,
      Salary: formData.Salary,
      Perks: formData.Perks,
    })
    .then(res => {
      console.log(res.data);
      alert(res.data);
      setFormData({
        CName: '',
        job: '',
        type:'',
        descr: '',
        eligibility: '',
        Salary: '',
        Perks: '',
      });
    })
    
  };

  return (
    <div className='jf'>

      <Nav />
      <h2>Add a New Oppurtunity</h2>
      <div className='jfg'>
        <img width={220} src={formimg} alt="form" />
      <form>
        <div>
        <label>
          Company: 
        </label>
        <input type="text" name="CName" value={formData.CName} onChange={handleChange} />
        </div>
       
       <div>
       <label>Job Type:</label>
        <select style={{"width":"260px","height":"30px"}} name="type" onChange={handleChange}  >
          <option value="">Select Type</option>
            <option value="Internship">Internship</option>
            <option value="Job">Job</option>
          </select>
       </div>
        
        <div>
        <label>
          Job Title:
        </label>
        <input
            type="text"
            name="job"
            value={formData.job}
            onChange={handleChange}
          />
        </div>
        
        <div>
        <label>
          Description:
          
        </label>
        <textarea
            name="descr"
            value={formData.descr}
            onChange={handleChange}
            cols={50}
            rows={5}
          />
        </div>
       <div>
       <label>
          Eligibility:
        </label>
        <input
            type="text"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
          />
       </div>
        
      <div>
      <label>
          Salary:
        </label>
        <input
            type="number"
            name="Salary"
            value={formData.Salary}
            onChange={handleChange}
          />
      </div>
      <div>
      <label>
          Perks:
        </label>
        <input
            type="text"
            name="Perks"
            value={formData.Perks}
            onChange={handleChange}
          />
      </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      </div>
    </div>
  );
}

export default Job;