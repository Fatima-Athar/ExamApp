import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import About from './components/About';
import AdminLogin from './components/AdminLogin'; 
import Navbar from './components/layout/Navbar';
import TeacherLogin from './components/TeacherLogin';
import StudentLogin from './components/StudentLogin';
import Protected from './components/Protected';
import TeacherProtected from './components/TeacherProtected';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import AddTeacher from './components/AddTeacher';
import AddStudent from './components/AddStudent';
import ViewTeacher from './components/ViewTeacher';
import ViewStudent from './components/ViewStudent';
import EditTeacher from './components/EditTeacher';
import EditStudent from './components/EditStudent';
import QuizTab from './components/QuizTab';
import ViewQuestion from './components/ViewQuestion';
import {AuthContext} from './components/_helpers/AuthContext';
import AddQuestion from './components/AddQuestion';
import {useState} from 'react';

function App() {
  const [authState,setAuthState] = useState(false);
  return (  
        <Router>
        <div className="App">
        
          <Navbar/> 
          <AuthContext.Provider value={{authState,setAuthState}}>
          <Routes>
            <Route exact path = '/about'  element={<About/>} />
            {!authState && ( <>
            <Route exact path = '/' element={<AdminLogin/>} />  
            <Route exact path = '/teacherLogin' element={<TeacherLogin/>} />
            <Route exact path = '/studentLogin' element={<StudentLogin/>} />
            </> )}
            <Route path = '/adminDashboard' element= {<Protected cmp={AdminDashboard}></Protected>}/>
            <Route path = '/teacherDashboard'  element={<TeacherProtected cmp={TeacherDashboard}></TeacherProtected>}/>
            <Route exact path="/studentDashboard"  element={<StudentDashboard/> }/>
            <Route exact path ='/adminDashboard/addTeacher' element={<AddTeacher/>} />
            <Route exact path ='/adminDashboard/addStudent' element={<AddStudent/>} />
            <Route exact path ='/adminDashboard/viewTeacher/:id' element={<ViewTeacher/>} />
            <Route exact path ='/adminDashboard/viewStudent/:id' element={<ViewStudent/>} />
            <Route exact path = '/adminDashboard/editTeacher/:id' element={<EditTeacher/>} />
            <Route exact path = '/adminDashboard/editStudent/:id' element={<EditStudent/>} />
            <Route exact path ='/teacherDashboard/QuizTab' element={<QuizTab/>} />
            <Route exact path = '/teacherDashboard/QuizTab/addQuestion/' element = {<AddQuestion/>} />
            <Route exact path = '/teacherDashboard/QuizTab/viewQuestion/:id' element = {<ViewQuestion/>} />
           
            <Route path='*' element= {<NotFound/>} />
          </Routes>
          </AuthContext.Provider>
          
          
        </div>
        </Router>
        
  );

  }

export default App;
