const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    description: String,
    options: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

const Questions = mongoose.model('Question', schema);
module.exports = Questions;