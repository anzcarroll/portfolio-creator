//======================
// REQUIREMENTS
//======================
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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
//this is our index





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



//======================
// UPDATE
//======================



//======================
// DELETE
//======================




//======================
// EXPORTS
//======================

module.exports = router;