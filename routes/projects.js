//======================
// REQUIREMENTS
//======================
const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');


var Project = require("../models/project")
var User = require("../models/user");
var Link = require("../models/link")


//======================
// NEW PROJECT FORM
//======================

router.get('/new', (req, res) => {
  const userId = req.params.userId;
  res.render(
    'projects/new', {
      userId
    }
  );
})

//============================
// NEW PROJECT CREATE ROUTE
//============================

router.post('/', (req, res) => {
    const userId = req.params.userId;
    const newProjectInfo = req.body;

    User.findById(userId).then((user) => {
      const newProject = new Project(newProjectInfo);
      console.log("new project id" + newProject.id);
      newProject.links = [];
      console.log(req.body);
      console.log(req.body.linkUrl);
      for (var i = 0; i < req.body.linkUrl.length; i++) {
      // console.log("Add another link")
      var newLinkUrl = req.body.linkUrl[i];
      var newLinkDescription = req.body.linkDescription[i];
      var newLink = new Link({
        url: newLinkUrl,
        description: newLinkDescription
      })
      newProject.links.push(newLink);
    }
    user.projects.push(newProject);

      return user.save();
      }).then((user) => {
        console.log(`Created a new project with ID of ${user.projects[0].id}`);
        res.redirect(`/users/${user.id}/projects`)
      })
    })


//======================
// EDIT
//======================

router.get('/:projectId/edit', (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  console.log("requested edit page");
  // res.send(`Your user ID is ${userIdToSearchDbFor}`)
  User.findById(userId)
    .then((user) => {
      var foundProject = user.projects.find((project) => {
        return project.id === projectId;
      })
      var arrayOfLinks = [];
      for (var i =0; i < foundProject.links.length; i++) {
          arrayOfLinks.push(foundProject.links.url);
      }
      var length = arrayOfLinks.length

      res.render('projects/edit', {
        user,
        userId, 
        project: foundProject, 
        links: foundProject.links,
        arrayOfLinks,
        length
      })
});
});


//======================
// SHOW PROJECT
//======================

router.get('/:projectId', (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;

    User.findById(userId)
      .then((user) => {
        var foundProject = user.projects.find((project) => {
          return project.id === projectId;
        })

        res.render('projects/show', {
          userId, 
          project: foundProject
        })
  });
});

//======================
// UPDATE
//======================

router.put('/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.params.userId;
  var arrayOfProjects = [];
 User.findById(userId).then((user) => {
    const foundProject = user.projects.find((project) => {
      return project.id === projectId;
    });
    arrayOfProjects = user.projects;
    foundProject.name = req.body.name;
    foundProject.user_name = req.body.user_name;
    foundProject.description = req.body.description;
    foundProject.imageUrl = req.body.imageUrl;
    // console.log("Before:")
    // console.log(foundProject.links);
    foundProject.links = [];
    // console.log("After:");
    // console.log(foundProject.links);
    for (var i = 0; i < req.body.linkUrl.length; i++) {
      // console.log("Add another link")
      var newLinkUrl = req.body.linkUrl[i];
      var newLinkDescription = req.body.linkDescription[i];
      var newLink = new Link({
        url: newLinkUrl,
        description: newLinkDescription
      })
      // console.log(newLink);
      foundProject.links.push(newLink);
    }
    // console.log(foundProject.links);


    // foundProject.links.link.url = req.body.link.url
    // foundProject.links.push(req.body.links);

    // then save the user and return the promise so we can chain
    // another .then() block and only use one .catch() block
    return user.save();

  }).then((user) => {
    // console.log(`updated user with ID of ${user._id}`);
    res.render('projects/index', {
          userId: user._id,
          user,
          arrayOfProjects,
          links: user.projects.links
        }
    )
  }).catch((error) => {
    console.log(`Failed to update project with ID of ${projectId}`);
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
        }
    )
  }).catch((error) => {
    console.log(`Failed to delete user with ID of ${userId}`);
    console.log(error);
  });
});



//======================
// EXPORTS
//======================
module.exports = router;
