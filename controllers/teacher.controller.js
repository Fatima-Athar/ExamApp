﻿const express = require('express');
const router = express.Router();
const userService = require('../services/teacher.service');

// routes
router.post('/login', login);
router.get('/', getAll); 
router.get('/students', getAllStudents);
router.get('/:id', getById); //jwt of admin
router.put('/:id', update); //jwt of admin


module.exports = router;

function login(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getAllStudents(req, res, next) {
    userService.getAllStudents()
        .then(students => res.json(students))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
