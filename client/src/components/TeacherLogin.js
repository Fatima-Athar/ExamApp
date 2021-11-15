import React, {Component} from 'react';


class TeacherLogin extends Component {
    login() {
        console.warn('state',this.state);
        fetch('http://localhost:4000/teacher/login',{
        method:'post',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify(this.state) 
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp.token);
                localStorage.setItem('auth', JSON.stringify(resp.token)) 
            })
        })
        //alert("Login Code Worked!")
    }
    render() {
        return(
            <div>
                <div>
                <div className="container"> <div className="py-4">
                    <input type="text" placeholder="Username"
                    onChange={(e)=>{this.setState({username:e.target.value})}}
                    />
                    <br /><br />
                    <input type="password" placeholder="Password" 
                     onChange={(e)=>{this.setState({password:e.target.value})}}
                     /> 
                     <br /><br />
                    <button onClick={()=>this.login()}>Login</button>
                    
                    </div></div> 
                </div>
            </div>
        );
    }
}

export default TeacherLogin;