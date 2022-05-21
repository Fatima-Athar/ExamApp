const express = require('express');
const Courses = require('../models/courses.model');
const Teachers = require('../models/teacher.model');  
const User = require('../models/user.model');
const Students = require('../models/student.model')
const router = express.Router()
const {
    validateToken,
    permitAdmin,
    permitAll,
  } = require("../middleware/AuthMiddleware");
//add one course
router.post('/createCourse', async (req, res) => {
    try {
        
        const { name } = req.body
        const { term } = req.body
        const { class_code } = req.body
        const { active_status } = req.body

        if (await Courses.findOne({ class_code: req.body.class_code })) {
            throw 'class_code "' + req.body.class_code + '" is already taken';
        }

        const course = await Courses.create({
            name,
            term,
            class_code,
            active_status
        })

        return res.status(201).json(course) 
        
       //res.send('Hello World')
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
//create course for a teacher
//:id is the _id of teacher in teacher collection
router.post('/teacherCourse/:id', async (req, res) => {

    try{
        
        if (await Courses.findOne({ class_code: req.body.class_code })) {
            throw 'class_code "' + req.body.class_code + '" is already taken';
        }

        const { name } = req.body
        const { term } = req.body
        const { class_code } = req.body
        const { active_status } = req.body
        const teacher = req.params.id
     //await Courses.create(req.body)
     const newCourse = await Courses.create({
        name,
        term,
        class_code,
        active_status,
        teacher
    }).then(function(newCourse) {
        console.log("hello")
      console.log(newCourse.name)
      return Teachers.findOneAndUpdate({_id: req.params.id }, {$push: {course:newCourse._id}}, { new: true });
    })
    .then(function(dbProduct) {
      // If we were able to successfully update a Product, send it back to the client
      return res.json(dbProduct);
    })
   }catch(err) {
      // If an error occurred, send it to the client
      return res.json(err);
    };
})

//update course 
router.put('/:id', async (req, res) => {
    try {
        const _id = req.params.id; 
        console.log(req.body)
        const { name } = req.body
        const { term } = req.body
        const { class_code } = req.body
        const { active_status } = req.body
        const {teacherID} = req.body
        
        console.log(teacherID)
        if (teacherID != null)
        {
            let user = await User.findOne({ user_id: teacherID })
            if (user) {
                console.log('hello')
                console.log(user.firstName)
                let findteacher = await Teachers.findOne({ teacher_id: user._id })
                console.log(findteacher._id)
                if (findteacher) {
                    let course = await Courses.findOne({ _id })
                    if (course) {

                        course.name = name
                        course.class_code = class_code
                        course.term = term
                        course.active_status = active_status
                        course.teacher = user._id
                        //console.log(findteacher.id)
                        await course.save()
                            .then(async function (course) {
                
                                const checkCourse = await Teachers.findOne({course: req.params.id})
                                //console.log(checkCourse)
                                if (!checkCourse){
                                await Teachers.findOneAndUpdate({ teacher_id: user._id }, { $push: { course: req.params.id } }, { new: true });
                                }
                            })
                            return res.status(200).json(course)                        
                    }

                }

            } else {
                throw 'Teacher ID "' + teacher_id + '" is invalid';
            }
        }else{
            let course = await Courses.findOne({ _id })

            if (!course) {
                course = await Courses.create({
                    name,
                    class_code,
                    term,
                    active_status,

                })
                return res.status(201).json(course)
            } else {
                course.name = name
                course.class_code = class_code
                course.term = term
                course.active_status = active_status

                await course.save()
                return res.status(200).json(course)
            }
        } 
        
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get all courses
router.get('/allCourses', async (req, res) => {
    try {
        const courses = await Courses.find().populate({
            path: 'teacher',
            select: ["teacher_id"],
            populate: {
              path: "teacher_id",
              select:["firstName","lastName","user_id"]
            }
          })
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get one course
router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        //path teacher fetches everyth from teacher collection
        const course = await Courses.findOne({_id}).populate({
            path: 'teacher',
            select: ["teacher_id"],
            populate: {
              path: "teacher_id",
              select:["firstName","lastName","user_id"]
            }
          })
        //const test = course.populate({path:"teacher.teacher_id"})
        //const testcourse = course.populate({path: "teacher.teacher_id"})
        //, "-course -id -phoneno -createdDate"
        //console.log(course.name)       
        if(!course){
            return res.status(404).json({})
        }else{
            return res.status(200).json(course)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


// delete one course
router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        //const course = await Courses.deleteOne({_id})

        const user = await User.findOne({user_id:req.body.user_id})
        //console.log(user.id);
        
        Teachers.findOneAndUpdate({teacher_id:user.id }, {
            $pull: {
                'course': req.params.id
            }
         }, function (err, model) {
            if (!err) {
                Courses.findByIdAndRemove({ _id: req.params.id }, (err) => {
                    if (err) res.json(err)
                    else res.json('Succesfully removed')
                });
            }
            else {
                res.status(500).json(err)
            }
        });

    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
/*
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.findOneAndUpdate({ username: req.user.username }, {
        $pull: {
            'projects': req.params.id
        }
     }, function (err, model) {
        if (!err) {
            Project.findByIdAndRemove({ _id: req.params.id }, (err) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
            });
        }
        else {
            res.status(500).json(err)
        }
    });
})*/

//add student to course
//:id is the _id of student  in user collection

//update course 
router.put('/enrolStudent/:id', async (req, res) => {
    try {
       /* console.log(req.body)*/
        const user = await User.findById(req.params.id)
        const code = req.body.class_code;
       // console.log(code)
     //  console.log(student)
        const Course = await Courses.findOne({class_code:code})
      //  console.log(course._id)
        if(!Course) throw 'Course not found'
        if(!user) throw 'User not found!'
        if(!(user.role==='student')){
            throw 'Student not Found!'
        }
        //console.log()
        const Student = await Students.findOne({student_id:user._id})
        console.log(Student)
        if (Course) {
                    await Student.save().
                    then(async function (Student) {
                    const checkCourse = await Students.findOne({course: Course._id})
                    //console.log(checkCourse)
                    if (!checkCourse){
                    await Students.findOneAndUpdate({student_id:user._id }, { $push: { course: Course._id } }, { new: true });
                    
                    }
                    
                } )
                
            } return res.status(200).json(Student);
                
        
        }
catch (error) {
        return res.status(500).json({"error":error})
    }
})



module.exports = router