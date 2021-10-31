const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('config/db');
const Question = db.Question;

module.exports = {
    getAll,
    createQuestion,
    editQuestion,
    getQuestionByID,
    deleteQuestionByID
}

// get all quiz questions
async function getAll(req, res) {
    return await Question.find();
}

// get one quiz question
async function getQuestionByID(req, res) {
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}

// create one quiz question
async function createQuestion(req, res) {
        const { description } = req.body
        const { options } = req.body

        const question = await Question.create({
            description,
            options
        })

        return res.status(201).json(question)
    
}

// update one quiz question
async function editQuestion(req, res) {
    try {
        const _id = req.params.id; 
        const { description, options } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                options
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.options = options
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}

// delete one quiz question
async function deleteQuestionByID(req, res) {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}