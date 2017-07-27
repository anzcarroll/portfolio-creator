//======================
// REQUIREMENTS
//======================
const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');




//======================
// INDEX
//======================
/* GET users listing. */

router.get('/', (req, res) => {
  console.log("Your list of projects");
  res.send("Your list of projects is complete");
})



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
