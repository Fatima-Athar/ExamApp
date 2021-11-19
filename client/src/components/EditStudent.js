import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({
    firstName: "",
    lastname:"",
    username: "",
    Class: ""
  });

  const { firstName, lastName, username, Class} = student;
  const onInputChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadStudent();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put('http://localhost:4000/admin/students/'+id, student);
    history("/adminDashboard");
  };

  const loadStudent = async () => {
    const result = await axios.get('http://localhost:4000/admin/students/'+id);
    setStudent(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Information of: {firstName} {lastName}</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter first Name"
              name="firstName"
              value={firstName}
              onChange={e => onInputChange(e)}
            />
            <br></br>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange={e => onInputChange(e)}
            />
            <br></br>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Username"
              name="username"
              value={username}
              onChange={e => onInputChange(e)}
            />
            <br></br>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Class"
              name="Class"
              value={Class}
              onChange={e => onInputChange(e)}
            />
            <br></br>
          </div>
          
          <button className="btn btn-primary">Update Student</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;