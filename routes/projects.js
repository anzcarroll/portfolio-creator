//======================
// REQUIREMENTS
//======================
const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');


var Project = require("../models/project")
var User = require("../models/user");


//======================
// INDEX
//======================


router.get('/', (req, res) => {
  var userId = req.params.userId;
  User.findById(userId)
      .then((user) => {
        var arrayOfProjects = user.projects;
        var projectId = arrayOfProjects[0];
        Project.findById(projectId)
        .then((project) => {
          res.render('projects/index', {
            userId: userId,
            user,
            arrayOfProjects,
            project
          })

        })
      });
//   console.log(Projects);
//   // res.send("this is index of all projects")
//   res.render(
//         'projects/index',
//         { Projects }
// );
})

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
// EXPORTS
//======================
module.exports = router;
