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


module.exports = router;