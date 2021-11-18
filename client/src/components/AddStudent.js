import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  let navigate = useNavigate();
  const [Student,setStudent] = useState({
    firstName:"",
    lastName:"",
    username:"",
    password:"",
    Class:""
  })

const {firstName,lastName,username,password,Class} = Student; 
const onInputChange = e => {
  setStudent({...Student,[e.target.name]: e.target.value})

}

const onSubmit = async e => {
  e.preventDefault()
  await axios.post('http://localhost:4000/admin/registerStudent',Student,
        {headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('auth'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        
    }})
  navigate('/AdminDashboard');

}
    return(
        <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Student</h2>
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
              type="password"
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
              placeholder="Enter Class"
              name="Class"
              value={Class}
              onChange ={e => onInputChange(e)} 
            />
          </div>
          <button className="btn btn-primary btn-block">Add Student</button>
        </form>
      </div>
    </div>
    )
};

export default AddStudent;