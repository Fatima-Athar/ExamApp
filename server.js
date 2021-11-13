require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('middleware/jwt');
const errorHandler = require('middleware/errors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/question',require('./controllers/question.controller'));
app.use('/admin', require('./controllers/users.controller'));
app.use('/teacher', require('./controllers/teacher.controller'));
app.use('/student', require('./controllers/student.controller'));
app.use('/question',require('./controllers/question.controller'))

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server running on port ' + port);
});
