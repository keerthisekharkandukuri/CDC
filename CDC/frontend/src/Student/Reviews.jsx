import React,{useState} from "react";
import Axios from "axios";
import Nav from "../Nav";

function Reviews(){
    const [name,setName]=useState("");
    const [review,setReview]=useState("");
    const [select,setSelect]=useState("");
    const [profile,setProfile]=useState("");
    const [company,setCompany]=useState("");

    function handleName(event){
           setName(event.target.value)
    }

    function handleSelect(event){
           setSelect(event.target.value);
    }

    function handleReview(event){
        setReview(event.target.value);
    }

    function handleSubmit(){
        Axios.post("http://localhost:4500/Reviews",{
            Name:name,
            Select:select,
            Review:review,
            Profile:profile,
            Company:company
        }).then(res =>{
             alert(res.data);
             setSelect("");
             setReview("");
             setName("");
             setProfile("");
             setCompany("");
        })
    }

    function handleURL(event){
         setProfile(event.target.value);
    }

    function handleCompany(event){
         setCompany(event.target.value);
    }
    return (
        <div className="rev">
            <Nav />
            <h2>Add New Story</h2>
            <form>
            <div>
            <label>Name:</label>
            <input value={name} type="String" onChange={(event)=>{handleName(event)}} placeholder="Name" />
            </div>
            <div>
            <label htmlFor="Reviews">Review On:</label>
          <select onChange={(event)=>{handleSelect(event)}}>
          <option value="">Select ReviewOn</option>
          <option value="interview-experience">Interview Experience</option>
          <option value="job-experience">Job Experience</option>
          <option value="abroad">Abroad</option>
          <option value="mtech">M.Tech</option>
          <option value="phd">Ph.D</option>
          </select>
            </div>

            <div>
            <label htmlFor="company">Company:</label>
          <input value={company} type="text" onChange={(e)=>{ handleCompany(e)}} placeholder="Name of Company"/>
            </div>

            <div>
            <label>Review:</label>
          <textarea value={review} onChange={(e)=>{handleReview(e)}} rows={5} cols={40} placeholder="Enter your Review............." />
            </div>
            <div>
            <label>LinkedIn profile:</label>
          <input type="text" value={profile}  onChange={event =>{handleURL(event)}} placeholder="LinkedIn profile" />
            </div>
          <button onClick={handleSubmit} >submit</button>
          </form>
        </div>
    )
}

export default Reviews;