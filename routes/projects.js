//======================
// REQUIREMENTS
//======================
const express = require('express');
const router = express.Router({mergeParams: true}); 
const mongoose = require('mongoose');


var Project = require("../models/project")
var User = require("../models/user");


//======================
// NEW USER FORM
//======================

router.get('/new', (req, res) => {
  const userId = req.params.userId;
  res.render(
    'projects/new', {
      userId
    }
  );
})

//========================
// NEW USER CREATE ROUTE
//========================

router.post('/', (req, res) => {
    const userId = req.params.userId;
    const newProjectInfo = req.body;

    User.findById(userId).then((user) => {
      const newProject = new Project(newProjectInfo);
      user.projects.push(newProject);
      return user.save();
      }).then((user) => {
        console.log(`Created a new project with ID of ${user.projects[0].id}`);

        res.render(
          'projects', {
            project: user.projects[-1]
          }
        )
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




router.get('/:projectId', (req, res) => {
  const userId = req.params.userId;
  const projectId = req.params.projectId;

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





// router.get('/:projectId/edit', (req, res) => {
//   const projectId = req.params.projectId;
//   res.send(`You want to edit project # ${projectId}`);
// })


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

    // then save the user and return the promise so we can chain
    // another .then() block and only use one .catch() block
    return user.save();

  }).then((user) => {
    console.log(`updated user with ID of ${user._id}`);

    res.render(
        'projects/index',
        {
         userId: user._id,
          user,
          arrayOfProjects
        },
    );
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
        },
    );
  }).catch((error) => {
    console.log(`Failed to delete user with ID of ${userId}`);
    console.log(error);
  });
});



//======================
// EXPORTS
//======================
module.exports = router;
