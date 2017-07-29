const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');

const NewUserSchema = require('../models/user.js')
var Project = require("../models/project")
var User = require("../models/user");

router.get('/', (req, res) => {
    console.log("im loading indexUser")
    res.render('index');
})


router.post('/', (req, res) => {

    // want to add more information to the user before
    // you save, use code below:
const newUser = new NewUserSchema(req.body);
console.log(newUser);

  newUser.save()
        .then((user) => {
            console.log(`New user created with ID of: ${user.id}`);

            res.render(
              `users/show`,
                { user }
            );
        })
        .catch((error) => {
            console.log('Error saving new user to database!');
            console.log(error);
        });
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

 User.findOne({"email": userEmail}, ).then((user) => {
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
            error: `Incorrect Username or Password`
        })
    }

  }).catch((error) => {
    console.log(`Failed to Login`);
    console.log(error);
  });
});

module.exports = router;