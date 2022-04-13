﻿﻿const express = require('express');
const router = express.Router();
const userService = require('../services/teacher.service');
const {validateToken, permitTeacher, permitAT} = require('../middleware/AuthMiddleware');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })

const fileFilter =(req, file, cb) => {
if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'|| file.mimetype==='image/jpg') {
    cb(null,true);
}
else {
    cb(null,false);
}


}

var upload = multer( {storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter:fileFilter
});
// routes
//router.post('/login', login);

router.put('/:user_id', validateToken, permitTeacher, update);
router.put('/addInfo/:user_id', upload.single('image'), validateToken, permitAT, addInfo);
router.get('/:id',validateToken,permitTeacher,getById);
module.exports = router;

/*function login(req, res, next) {
    userService.login(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}*/

function update(req, res, next) {
    
    userService.update(req.params.user_id,req.body)
    .then(() => res.json({
        data: req.body
       }))
    .catch(err => next(err));
}

function addInfo(req,res,next) {
    
    userService.addInfo(req.params.user_id,req.body,req.file)
         
        .then(() => res.json({
            
            data: req.body,
            image:req.file.path
            
           }))
        .catch(err => next(err));

}


function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}