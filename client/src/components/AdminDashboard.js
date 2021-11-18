import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    
    const nav = useNavigate();
    const [teachers, setTeacher] = useState([]);
    const [students, setStudent] = useState([]);

    useEffect(() => {
        loadTeachers();
        loadStudents();
    }, []);

    const viewTeacher = async id => {
        nav('/adminDashboard/viewTeacher/'+id)

    };
    const viewStudent = async id => {
        nav('/adminDashboard/viewStudent/'+id)

    };
    const loadTeachers = async () => {
        const result =
            await axios({
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('auth'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                url: "http://localhost:4000/admin/teachers/"
            })
        console.log(result.data)
        setTeacher(result.data)

        //setUser(result.data.reverse());
    };
    const deleteTeacher = async id => {
        await axios.delete('http://localhost:4000/admin/deleteTeacher/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth')
            }
        }, {
            data: { id: id }
        });
        loadTeachers();
    };
    const deleteStudent = async id => {
        await axios.delete('http://localhost:4000/admin/deleteStudent/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth')
            }
        }, {
            data: { id: id }
        });
        loadStudents();
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
                <table class="table table-hover border shadow">
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
                                    <button className="btn btn-outline-secondary me-2" onClick={() => viewTeacher(teacher.id)} >View</button>
                                    <button className="btn btn-outline-danger" onClick={() => deleteTeacher(teacher.id)} >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='py-4'>
                    <h1> Students</h1>
                    <table class="table table-hover border shadow">
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
                                    <td>
                                        <button className="btn btn-outline-secondary me-2" onClick={() => viewStudent(student.id)} >View</button>
                                        <button className="btn btn-outline-danger" onClick={() => deleteStudent(student.id)} >Delete</button>
                                    </td>

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