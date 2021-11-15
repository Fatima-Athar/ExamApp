import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

const AdminDashboard = () => {
    const [teachers, setTeacher] = useState([]);
    const [students, setStudent] = useState([]);
    
    useEffect(() => {
        loadTeachers();
        loadStudents();
      }, []);
    
      const loadTeachers = async () => {
        const result = 
        await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            },
            url: "http://localhost:4000/admin/teachers"
        })
        console.log(result.data)
        setTeacher(result.data)

        //setUser(result.data.reverse());
      };


      const loadStudents = async () => {
        const result = 
        await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            },
            url: "http://localhost:4000/admin/students"
        })
        console.log(result.data)
        setStudent(result.data)

        //setUser(result.data.reverse());
      };

    /*try {

        console.log(localStorage.getItem("auth"))

        /*fetch("http://localhost:4000/admin/admins", {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp); 
            })
        })

    } catch (e) {
        console.log(e)
    }*/
    return (
        <div className="container">
            <div className='py-4'>
                <h1> Teachers</h1>
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
            {teachers.map((teacher, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.username}</td>
                <td>
                <Link className="btn btn-outline-secondary" to='/adminDashboard/addTeacher'>View</Link>
                
                <Link className="btn btn-outline-danger" to='/adminDashboard/addTeacher'>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
                </table>
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
        </div>
    );
};

export default AdminDashboard;