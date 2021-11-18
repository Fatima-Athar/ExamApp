import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
    const [students, setStudent] = useState([]);

    useEffect(() => {
        loadStudents();
      }, []);

      const loadStudents = async () => {
        const result = 
        await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            },
            url: "http://localhost:4000/teacher/students"
        })
        console.log(result.data)
        setStudent(result.data)

        //setUser(result.data.reverse());
      };

    return (
        <div className="container">
          <br></br>
          <Link className="btn btn-outline-secondary me-2" to='/TeacherDashboard/QuizTab'  >Quiz Tab</Link>
            <div className='py-4'>
                <h1> Students</h1>
                <table class="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">username</th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
            {students.map((student, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.username}</td>
                
              </tr>
            ))}
          </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherDashboard;