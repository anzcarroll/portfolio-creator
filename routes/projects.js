//======================
// REQUIREMENTS
//======================
const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');


var Project = require("../models/project")
var User = require("../models/user");


//======================
// UPDATE
//======================

router.get('/:projectId/update', (req, res) => {
  const projectId = req.params.projectId;
  res.send(`You want to update project # ${projectId}`);
})

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

//======================
// NEW
//======================

router.get('/new', (req, res) => {
  res.render(`projects/new`);
})

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
// DELETE
//======================
router.get('/:projectId/delete', (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  var arrayOfProjects = [];
  User.findById(userId)
    .then((user) => {
      arrayOfProjects = user.projects;
      
      user.projects.id(projectId).remove();
      
      return user.save();
    })
    .then((user) => {
      res.render(
        'projects/index',
        {
          userId: user._id,
          user,
          arrayOfProjects
        },
    );
  }).catch((error) => {
    console.log(`Failed to delete user with ID of ${userId}`);
    console.log(error);
  });
});

//======================
// INDEX
//======================


router.get('/', (req, res) => {
  var userId = req.params.userId;
  User.findById(userId)
      .then((user) => {
        var arrayOfProjects = user.projects;
        // console.log(arrayOfProjects);
        res.render('projects/index', {
          userId,
          user,
          arrayOfProjects,
        })
        })
      });

//======================
// EXPORTS
//======================
module.exports = router;
