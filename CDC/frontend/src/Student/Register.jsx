import React, { useState } from 'react';
import axios from 'axios';
import Nav from "../Nav";
import register from "../register.png.webp"

function RegisterForm() {
    // Define state variables
    const [y,setY]=useState('0');
    const [formData, setFormData] = useState({
        firstName: '',
        roll: '',
        email: '',
       
        branch: '',
        year: '',
        regNo: '',
        sem: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if(name==="year"){
            setY(value);
        }
    };

    // Handle file changes
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle form submission
    const handleRegister = async () => {
        try {
            // Create a new FormData object and append form data and file
            const formDataToSend = new FormData();
            formDataToSend.append('file', selectedFile);
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('roll', formData.roll);
            formDataToSend.append('email', formData.email);
            
            formDataToSend.append('branch', formData.branch);
            formDataToSend.append('year', formData.year);
            formDataToSend.append('regNo', formData.regNo);
            formDataToSend.append('sem', formData.sem);

            // Send POST request
            const response = await axios.post("http://localhost:4500/registration", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle response
            alert(response.data);
            setFormData({
                firstName: '',
                roll: '',
                email: '',
                
                branch: '',
                year: '',
                regNo: '',
                sem: ''
            });
            setSelectedFile(null);

        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className='jf'>
            <Nav />
            <h2>Registration Form</h2>
            <div className='jfg'>
                <img width={220}  src={register} alt="register"  />
            <form>
                <div>
                <label>
                    Name:
                </label>
                <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                <label>
                    Roll No.:
                   
                </label>
                <input
                        type="number"
                        name="roll"
                        value={formData.roll}
                        onChange={handleChange}
                    />
                </div>
               <div>
               <label>
                    Email:
                </label>
                <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
               </div>
                <div>
                <label>
                    Branch:
                   
                </label>
                <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                <label>
                    Year:
                    
                </label>
                <select style={{"width":"200px","height":"30px"}} name='year' value={formData.year} onChange={handleChange}>
                <option value='0'>select Sem</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </div>
                <div>
                <label>
                    Semester:
                   
                </label>
                <div>
                {y=='0'?<select style={{"width":"200px","height":"30px"}} name='sem' value={formData.sem} onChange={handleChange}>
                   
                    <option value='1_1'>1_1</option>
                    <option value='1_2'>1_2</option>
                    <option  value='2_1'>2_1</option>
                    <option value='2_2'>2_2</option>
                    <option value='3_1'>3_1</option>
                    <option value='3_2'>3_2</option>
                    <option value='4_1'>4_1</option>
                    <option value='4_2'>4_2</option>
                </select>:y=='1'?<select style={{"width":"200px","height":"30px"}} name='sem' value={formData.sem} onChange={handleChange}>
                   
                   <option value='1_1'>1_1</option>
                   <option value='1_2'>1_2</option>
               </select>:y==='2'?<select style={{"width":"200px","height":"30px"}} name='sem' value={formData.sem} onChange={handleChange}>
                 
                   <option  value='2_1'>2_1</option>
                   <option value='2_2'>2_2</option>
                  
               </select>:y==='3'?<select style={{"width":"200px","height":"30px"}} name='sem' value={formData.sem} onChange={handleChange}>
                   <option value='3_1'>3_1</option>
                   <option value='3_2'>3_2</option>
               </select>:<select style={{"width":"200px","height":"30px"}} name='sem' value={formData.sem} onChange={handleChange}>
                   <option value='4_1'>4_1</option>
                   <option value='4_2'>4_2</option>
               </select>}
                </div>
                </div>
                
               <div>
               <label>
              Reg No.:
               </label>
               <input
                     type="number"
                     name="regNo"
                     value={formData.regNo}
                     onChange={handleChange}/>
               </div>
             <div>
             <label>Receipt:</label>
             <input type="file" name="receipt"  onChange={handleFileChange} />
             </div>
      <button type="button" onClick={handleRegister}>Register</button>
    </form>
    </div>
</div>
);
}

export default RegisterForm;

