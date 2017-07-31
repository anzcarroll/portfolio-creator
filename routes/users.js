//======================
// REQUIREMENTS
//======================
var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose');

var User = require("../models/user");


//======================
// INDEX
//======================
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', (req, res) => {

  console.log("Your user data");
  res.send("Your user data");
})

//======================
// NEW
//======================
//this is our home page
//======================
// CREATE
//======================
// this is our home page





//======================
// SHOW
//======================
// Create a GET show route "/:id" that renders the users's show page
router.get('/:userId', (req, res) => {
  const userIdToSearchDbFor = req.params.userId
//  res.send(`Your user ID is ${userIdToSearchDbFor}`)

    User.findById(userIdToSearchDbFor)
        .then((user) => {
            console.log(user)
            res.render(
                'users/show',
                { user }
            );
        })
        .catch((error) => {
            console.log(`Error retrieving user with ID of ${userIdToSearchDbFor}`)
        });
});


//======================
// UPDATE
//======================

///NOT FINDING ROUTE TO THIS IN BROWSER,
//NEED TO UPDATE ALL USER INFO 
//THEN RENDER SHOW PAGE OF THAT USERS ID+INFO
 router.put('/:userId', (req, res) => {
    const userIdToUpdate = req.params.userId;
    const infoToUpdate = req.body;
    User.findByIdAndUpdate(userIdToUpdate,infoToUpdate)
    .then((user) => {
            console.log(`User with ID of ${userIdToUpdate} updated!`);
            res.redirect(`/users/${userIdToUpdate}`)
        })
        .catch((error) => {
            console.log(`User with ID of ${userIdToUpdate} failed to update!`)
            console.log(error);
        })
 })


//======================
// EDIT
//======================
router.get('/:userId/edit', (req, res) => {
    var userId = req.params.userId;

    User.findById(userId)
        .then((user) => {
            res.render('users/edit', { 
                user 
            })
        })
        .catch((error) => {
            console.log(`Error rendering edit form for user with ID of ${userId}`)
        })
});





//======================
// DELETE
//======================




//======================
// EXPORTS
//======================

module.exports = router;