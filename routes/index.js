const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');

const NewUserSchema = require('../models/user.js')

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

module.exports = router;