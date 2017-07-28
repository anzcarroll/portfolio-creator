//======================
// REQUIREMENTS
//======================
const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');


var Projects = require("../models/project")

//======================
// INDEX
//======================


router.get('/', (req, res) => {
  console.log("Your list of projects");
  res.send("this is index of all projects")
  // res.render(
  //       '/',
  //       { Projects }
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
