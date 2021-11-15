import axios from 'axios';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const AddTeacher = () => {
  const [Teacher,setTeacher] = useState({
    firstName:"",
    lastName:"",
    username:"",
    password:"",
    subject:""
  })

const {firstName,lastName,username,password,subject} = Teacher; 
const onInputChange = e => {
  setTeacher({...Teacher,[e.target.name]: e.target.value})

}

const onSubmit = async e => {
  e.preventDefault()
  await axios({
    method: 'post',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('auth'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
    },
    url: "http://localhost:4000/admin/registerTeacher",Teacher
})

}
    return(
        <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Teacher</h2>
        <form onSubmit={e =>onSubmit(e) }>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="firstName"
              value={firstName}
              onChange ={e => onInputChange(e)} 
              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange ={e => onInputChange(e)} 

            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Initial Username"
              name="username"
              value={username}
              onChange ={e => onInputChange(e)} 
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Initial password"
              name="password"
              value={password}
              onChange ={e => onInputChange(e)} 
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Subject"
              name="subject"
              value={subject}
              onChange ={e => onInputChange(e)} 
            />
          </div>
          <button className="btn btn-primary btn-block">Add Teacher</button>
        </form>
      </div>
    </div>
    )
};

export default AddTeacher;