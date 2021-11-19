
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./_helpers/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let history = useNavigate();

    const login = () => {

        const data = { username: username, password: password };
        axios.post("http://localhost:4000/admin/login", data).then((response) => {
            if (response.data.error) {

                alert('Login Failed!')
            } else {
                localStorage.setItem('auth', (response.data.token));
                console.log(localStorage.getItem('auth'))
                setAuthState(true);
                alert("Login Successful!")
                history("/adminDashboard");
            }
        });
    };
    return (
        <div>
                <div>
                <div className="container"> <div className="py-4">
                    <input type="text" placeholder="Username"
                    onChange={(event)=>{setUsername(event.target.value);}}
                    />
                    <br /><br />
                    <input type="password" placeholder="Password" 
                     onChange={(event)=>{setPassword(event.target.value)}}
                     /> 
                     <br /><br />
                    <button onClick={login}>Login</button>
                    
                    </div></div> 
                </div>
            </div>
            );
}

            export default Login;
