const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

const NewUserSchema = require('../models/user.js')
var Project = require("../models/project")
var User = require("../models/user");

router.get('/', (req, res) => {
    userNotLoggedIn = true;
    console.log("im loading indexUser")
    res.render('index', {
        userNotLoggedIn
    });
})

//===================================
// CREATE NEW USER
//===================================
router.post('/', (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    User.findOne({"email": userEmail}).then((user) => {
        if (user === null) {
            const newUser = new NewUserSchema(req.body);
            newUser.save()
                    .then((user) => {
                        res.render(`users/show`, { 
                            user,
                     } );
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
    userNotLoggedIn = true;
    res.render('about', {
        userNotLoggedIn
    });
})

router.get('/login', (req, res) => {
    userNotLoggedIn = true;
    res.render('login', {
        userNotLoggedIn
    });
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
                arrayOfProjects,
            })
        } else {
            userNotLoggedIn = true;
            res.render('login', {
                userNotLoggedIn,
                errorMessage: `Incorrect Password`
            })
        } 
    })
    .catch((error) => {
                userNotLoggedIn = true;
                res.render('login', {
                userNotLoggedIn,
                errorMessage: `Email Address does not exist`
  });
    
  })
});


router.get('/:userName', (req, res) => {
    const userName = req.params.userName;
    User.findOne({"user_name": userName})
    .then((user) => {
        userNotLoggedIn = true;
        res.render('portfolios/show', {
            user,
            userNotLoggedIn,
            portfolioHeader: `${user.first_name} ${user.last_name}'s Portfolio`
    })
        }).catch((err) => {
        res.send(`User does not exist`);
    })
})

module.exports = router;