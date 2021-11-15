import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import About from './components/About';
import AdminLogin from './components/AdminLogin'; 
import Navbar from './components/layout/Navbar';
import TeacherLogin from './components/TeacherLogin';
import StudentLogin from './components/StudentLogin';
import Protected from './components/Protected';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import AddTeacher from './components/AddTeacher';
import AddStudent from './components/AddStudent';
function App() {
  return (  
        <Router>
        <div className="App">
          
          <Navbar/> 
          
          <Routes>
            <Route exact path = '/about'  element={<About/>} />
            <Route exact path = '/' element={<AdminLogin/>} />
            <Route exact path = '/teacherLogin' element={<TeacherLogin/>} />
            <Route exact path = '/studentLogin' element={<StudentLogin/>} />
            <Route exact path = '/adminDashboard'  element={<AdminDashboard/>} />
            <Route exact path = '/TeacherDashboard'  element={<TeacherDashboard/>} />
            <Route path="/studentDashboard"  element={<Protected cmp={StudentDashboard}></Protected>} />
            <Route exact path ='/adminDashboard/addTeacher' element={<AddTeacher/>} />
            <Route exact path ='/adminDashboard/addStudent' element={<AddStudent/>} />
            <Route path='*' element= {<NotFound/>} />
          </Routes>
        </div>
        </Router>
  );

  }

export default App;
