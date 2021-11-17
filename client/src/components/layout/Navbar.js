import React from "react";
import {Link, NavLink} from 'react-router-dom';
import image from '../logo.jpg';
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container" >
            <NavLink className="navbar-brand " exact to="/">
                
                <img src={image} alt='logo' display='block' height={60} width={60} />
                    </NavLink>
            <div className="container-fluid">
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    
                </button>
                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" exact to="/">Admin Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" exact to="/teacherLogin">Teacher Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" exact to="/studentLogin">Student Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" exact to="/adminDashboard">Admin Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" exact to="/teacherDashboard">Teacher Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/about">About</NavLink>
                        </li>
                        
                    </ul>

                </div>
            </div>
            
            <Link className='btn btn-outline-light me-2' to='/adminDashboard/addTeacher'>Add Teacher</Link>
            <Link className='btn btn-outline-light me-2 ' to='/adminDashboard/addStudent'>Add Student</Link>
        </div>
        </nav>
    );
};

export default Navbar;