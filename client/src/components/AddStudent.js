import React from 'react';

const AddStudent = () => {
    return(
        <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Student</h2>
        <form >
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="firstName"
              
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="lastName"
              
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Initial Username"
              name="username"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Initial password"
              name="password"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Class"
              name="class"
            />
          </div>
          <button className="btn btn-primary btn-block">Add Student</button>
        </form>
      </div>
    </div>
    )
};

export default AddStudent;