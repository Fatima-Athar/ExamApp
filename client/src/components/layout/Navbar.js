import React from "react";
import {Link, NavLink} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import image from '../logo.jpg';
const Navbar = () => {
    const history = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('user');
    const logout = () => {
        history("/")
        localStorage.clear()
    }
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
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {!token &&
                            <NavLink className="nav-link" aria-current="page" exact to="/"> Login</NavLink>
                            }
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/profilePage"> Profile Page</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/about">About</NavLink>
                        </li>
                        
                        <li className="nav-item">
                            {token &&
                            <button  className="btn btn-primary btn-block" onClick={logout}>Logout</button>
                    }
                        </li>


                        
                    </ul>

                </div>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;