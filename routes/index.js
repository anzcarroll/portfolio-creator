const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

const NewUserSchema = require('../models/user.js')
var Project = require("../models/project")
var User = require("../models/user");

router.get('/', (req, res) => {
    console.log("im loading indexUser")
    res.render('index');
})


router.post('/', (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    User.findOne({"email": userEmail}).then((user) => {
        if (user === null) {
            const newUser = new NewUserSchema(req.body);
            newUser.save()
                    .then((user) => {
                        res.render(`users/show`, { user } );
                    })
                    .catch((error) => {
                        console.log('Error saving new user to database!');
                        console.log(error);
                    });
        } else {
            res.render('login', {
                errorMessage: `User already exists. Please log in`
            });
        }

    })





});

router.get('/about', (req, res) => {
    res.render('about');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.put('/login-submit', (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  console.log(`Email: ${userEmail}`);
  console.log(`Password: ${userPassword}`)

 User.findOne({"email": userEmail}).then((user) => {
    console.log(`This user's object: ${user}`);
    console.log(`This user's password: ${user.password}`);
    arrayOfProjects = user.projects;
        if (user.password === req.body.password) {
            res.render('projects/index', {
                userId: user._id,
                user, 
                arrayOfProjects
            })
        } else {
            res.render('login', {
                errorMessage: `Incorrect Password`
            })
        } 
    })
    .catch((error) => {
                res.render('login', {
                errorMessage: `Email Address does not exist`
  });
    
  })
});

module.exports = router;