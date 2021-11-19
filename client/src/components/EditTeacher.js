import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTeacher = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastname:"",
    username: "",
    Subject: ""
  });

  const { firstName, lastName, username, Subject } = teacher;
  const onInputChange = e => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadTeacher();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put('http://localhost:4000/admin/teachers/'+id, teacher);
    history("/adminDashboard");
  };

  const loadTeacher = async () => {
    const result = await axios.get('http://localhost:4000/admin/teachers/'+id);
    setTeacher(result.data);
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
              placeholder="Enter Subjecgt"
              name="Subject"
              value={Subject}
              onChange={e => onInputChange(e)}
            />
            <br></br>
          </div>
          
          <button className="btn btn-primary">Update Teacher</button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacher;