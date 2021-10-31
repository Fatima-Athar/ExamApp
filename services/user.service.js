
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('config/db');
const User = db.User;
const Teacher = db.Teacher;
const Student = db.Student;

module.exports = {
    authenticate,
    getAll,
    getAllTeachers,
    getAllStudents,
    getById,
    create,
    update,
    delete: _delete,
    createTeacher,
    createStudent,
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}
async function getAllTeachers() {
    return await Teacher.find();
}
async function getAllStudents() {
    return await Student.find();
}
async function getById(id) {
    return await User.findById(id);
}


async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function createTeacher(userParam) {
    // validate
    if (await Teacher.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const teacher = new Teacher(userParam);

    // hash password
    if (userParam.password) {
        teacher.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save teacher
    await teacher.save();
}

async function createStudent(userParam) {
    // validate
    if (await Student.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const student = new Student(userParam);

    // hash password
    if (userParam.password) {
        student.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save student
    await student.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}