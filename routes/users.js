//======================
// REQUIREMENTS
//======================
var express = require('express');
const router = express.Router({mergeParams: true}); 
var mongoose = require('mongoose');

var User = require("../models/user");
var Project = require("../models/project")


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
// Create a GET new route "/new" that renders the new.hbs form
//this is our index home page 



//======================
// SHOW
//======================
// Create a GET show route "/:id" that renders the users's show page
router.get('/:userId', (req, res) => {
  const userIdToSearchDbFor = req.params.userId
  // res.send(`Your user ID is ${userIdToSearchDbFor}`)

    User.findById(userIdToSearchDbFor)
        .then((user) => {
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
// CREATE
//======================




//======================
// EDIT
//======================
router.get('/:userId', (req, res) => {

    const userIdToFind = req.params.userId;

    User.findById(userIdToFind)
        .then((user) => {
            res.render(
                'users/edit',
                { user }
            );
        })
        .catch((error) => {
            console.log(`Error rendering edit form for user with ID of ${userIdToFind}`)
        })
});

//======================
// UPDATE
//======================
router.put('/:userId', (req, res) => {
    console.log("You asked to update your user ID");
    const userIdToUpdate = req.params.userId;
    console.log("I am the userID to update" + userIdToUpdate);
    console.log(`Your User Id: ${userIdToUpdate}`)
    const updatedUserInfo = req.body;

    User.findByIdAndUpdate(
        userIdToUpdate,
        updatedUserInfo,
        { new: true } // <-- DON'T FORGET THIS!!!
        
    )
        .then((user) => {
            console.log(`User with ID of ${user.id} updated!`);

            res.render(
                'users/show',
                { user,
                userIdToUpdate,
                updatedUserInfo 
                }
            )
        })
        .catch((error) => {
            console.log(`User with ID of ${user.id} failed to update!`)
            console.log(error);
        })

});



//======================
// DELETE
//======================




//======================
// EXPORTS
//======================

module.exports = router;