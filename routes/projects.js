//======================
// REQUIREMENTS
//======================
const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');


var Project = require("../models/project")
var User = require("../models/user");




router.get('/:projectId/edit', (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  console.log("requested edit page");
  // res.send(`Your user ID is ${userIdToSearchDbFor}`)

    Project.findById(projectId)
        .then((project) => {
          console.log(userId);
            res.render(
                'projects/edit',
                { project, 
                  userId }
            );
        })
        .catch((error) => {
            console.log(`Error retrieving user with ID of ${userId}`)
        });
});

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

router.get('/new', (req, res) => {
  res.send(`You want to create a new project`);
})



//======================
// SHOW
//======================
// Create a GET show route "/:id" that renders the donut's show page

router.get('/:projectId', (req, res) => {
  const projectId = req.params.projectId
  res.send(`Your project ID is ${projectId}`);
})


//======================
// CREATE
//======================




//======================
// EDIT
//======================
router.get('/:projectId/edit', (req, res) => {
  const projectId = req.params.projectId;
  res.send(`You want to edit project # ${projectId}`);
})


//======================
// UPDATE
//======================

router.get('/:projectId/update', (req, res) => {
  const projectId = req.params.projectId;
  res.send(`You want to update project # ${projectId}`);
})


//======================
// DELETE
//======================
router.get('/:projectId/delete', (req, res) => {
  const projectId = req.params.projectId;
  res.send(`You want to delete project # ${projectId}`);
})

//======================
// INDEX
//======================


router.get('/', (req, res) => {
  var userId = req.params.userId;
  User.findById(userId)
      .then((user) => {
        console.log(`User object: ${user}`)
        var arrayOfProjects = user.projects;
        console.log(`Array of Objects ${arrayOfProjects}`);
        // console.log(arrayOfProjects);
        res.render('projects/index', {
          userId: userId,
          user,
          arrayOfProjects,
        })
        })
      });

//======================
// EXPORTS
//======================
module.exports = router;
