//======================
// REQUIREMENTS
//======================
const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');


var User = require("../models/user");
var Project = require("../models/project");

//======================
// INDEX
//======================
/* GET users listing. */

router.get('/', (req, res) => {
  console.log("Your list of projects");
  res.send("Your list of projects is complete");
})

router.get('/new', (req, res) => {
  res.send(`You want to create a new project`);
})

router.get('/:projectId/delete', (req, res) => {
  const projectId = req.params.projectId;
  res.send(`You want to delete project # ${projectId}`);
})

router.get('/:projectId/edit', (req, res) => {
  const projectId = req.params.projectId;
  res.send(`You want to edit project # ${projectId}`);
})

router.get('/:projectId/update', (req, res) => {
  const projectId = req.params.projectId;
  res.send(`You want to update project # ${projectId}`);
})

// router.get('/:projectId', (req, res) => {
//   const projectId = req.params.projectId
//   res.send(`Your project ID is ${projectId}`);
// })
router.get('/:projectId', (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  // res.send(`Your user ID is ${userIdToSearchDbFor}`)

    Project.findById(projectId)
        .then((project) => {
          console.log(userId);
            res.render(
                'projects/show',
                { project, 
                  userId }
            );
        })
        .catch((error) => {
            console.log(`Error retrieving user with ID of ${userId}`)
        });
});







//======================
// NEW
//======================
// Create a GET new route "/new" that renders the new.hbs form



//======================
// SHOW
//======================
// Create a GET show route "/:id" that renders the donut's show page




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
