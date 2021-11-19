﻿const express = require('express');
const router = express.Router();
const adminService = require('../services/user.service');
// routes
router.post('/login', login);
router.post('/register', register);
router.get('/admins', getAll);
router.get('/teachers', getAllTeachers);
router.get('/students', getAllStudents);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.delete('/deleteTeacher/:id',deleteTeacher);
router.delete('/deleteStudent/:id',deleteStudent);
//routes for teacher related issues
router.post('/registerTeacher', registerTeacher);
router.post('/registerStudent', registerStudent);
router.get('/teachers/:id',getTeacherById);
router.get('/students/:id',getStudentById);
router.put('/teachers/:id',updateTeacher);
router.put('/students/:id',updateStudent);

module.exports = router;

function login(req, res, next) {
    adminService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    adminService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function registerTeacher(req, res, next) {
    adminService.createTeacher(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function registerStudent(req, res, next) {
    adminService.createStudent(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    adminService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAllTeachers(req, res, next) {
    adminService.getAllTeachers()
        .then(teachers => res.json(teachers))
        .catch(err => next(err));
}

function getAllStudents(req, res, next) {
    adminService.getAllStudents()
        .then(students => res.json(students))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    adminService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    adminService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getTeacherById(req,res,next) {
    adminService.getTeacherById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function getStudentById(req,res,next) {
    adminService.getStudentById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}
function update(req, res, next) {
    adminService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateTeacher(req, res, next) {
    adminService.updateTeacher(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateStudent(req, res, next) {
    adminService.updateStudent(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function _delete(req, res, next) {
    adminService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteTeacher(req, res, next) {
    adminService.deleteTeacher(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteStudent(req, res, next) {
    adminService.deleteStudent(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
