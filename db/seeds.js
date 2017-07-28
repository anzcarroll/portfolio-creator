require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var User = require('../models/user');
var Project = require('../models/project');
var Portfolio = require('../models/portfolio');
var Link = require('../models/link');

mongoose.promise = global.Promise;

var db = mongoose.connection;

Project.remove({}, function(err) {
    console.log(err);
});

User.remove({}, function(err) {
    console.log(err);
});

Portfolio.remove({}, function(err) {
    console.log(err);
});

Link.remove({}, (err) => {
    console.log(err);
})

// ASHELEIGH SEEDED DATA

var Ashleigh = new User({
    first_name: 'Ashleigh',
    last_name: 'Carroll',
    email: 'anzcarroll@gmail.com',
    created_at: '',
    updated_at: '',
    age: 24,
    gender: 'F',
    user_name: 'World-Crusher',
    password: 'badasskittens',
    // portfolio: 'Ashleigh Carroll Portfolio',
    job_name: "Web Developer"
});

// SEAN SEEDED DATA

var Sean = new User({
    first_name: 'Sean',
    last_name: 'Gilmore',
    email: 'sgilmore@michael-sean.com',
    created_at: '',
    updated_at: '',
    age: 46,
    gender: 'M',
    user_name: 'MSeanG',
    password: 'badasskittens',
    // portfolio: 'Sean\'s Portfolio',
    job_name: "Full Stack Web Developer"
});

// JONATHAN SEEDED DATA

var Jonathan = new User({
    first_name: 'YayPants',
    last_name: 'Watson',
    email: 'kittensandcuddles@gmail.com',
    created_at: '',
    updated_at: '',
    age: 29,
    gender: 'M',
    user_name: 'TheBoss',
    password: 'badasskittens',
    // portfolio: 'Jonathan Watson\'s Portfolio',
    job_name: "Web Developer"
});

// JOEY SEEDED DATA

var JoeyPortfolioLinkJeopardy = new Link({
    name: 'Joey Hurley Jeopardy bitballoon',
    url: 'https://github.com/jchurley95',
    description: 'Link to my deployed jeopardy app'
});


var JoeyPortfolioLinkGitHub = new Link({
    name: 'Joey Hurley GitHub',
    url: 'https://github.com/jchurley95',
    description: 'Link to my GitHub profile'
});

var JoeyJeopardyLinkGitHub = new Link({
    name: 'Joey Hurley GitHub',
    url: 'https://github.com/jchurley95/Jeopardy',
    description: 'Link to my GitHub profile'
});

var JoeyJeopardy = new Project({
    name: 'Jeopardy',
    user_name: 'TheRealDannyHurley',
    description: 'Prove you\'re smarter than your friends',
    imageUrl: '../public/img/joeyhurleyjeopardy.png',
    links: [JoeyPortfolioLinkJeopardy, JoeyJeopardyLinkGitHub],
    created_at: '',
    updated_at: ''
});

var JoeyPortfolio = new Portfolio({
    name: 'Joey Hurley\'s Portfolio',
    projects: [JoeyJeopardy],
    created_at: '',
    updated_at: '',
    links: [JoeyPortfolioLinkGitHub],
    user_name: 'TheRealDannyHurley'
});

var Joey = new User({
    first_name: 'Joey',
    last_name: 'Hurley',
    email: 'jchurley95@gmail.com',
    created_at: '',
    updated_at: '',
    age: 22,
    gender: 'M',
    user_name: 'TheRealDannyHurley',
    password: 'badasskittens',
    portfolio: JoeyPortfolio,
    projects: [JoeyJeopardy],
    job_name: "Web Developer"
});

// Save Ashleigh
Ashleigh.save( (err) => {
    if (err) console.log('Ashleigh user error' + err);
    console.log('Ashleigh created');
})

// Save Joey Links, project, portfolio, user
JoeyPortfolioLinkJeopardy.save( (err) => {
    if (err) console.log('Joey Link Jeopardy error' + err);
    console.log('Joey Jeopardy Link created');
})
JoeyPortfolioLinkJeopardy.save( (err) => {
    if (err) console.log('Joey Link Jeopardy error' + err);
    console.log('Joey Jeopardy Link created');
})
JoeyPortfolioLinkGitHub.save( (err) => {
    if (err) console.log('Joey Link GitHub error' + err);
    console.log('Joey GitHub Link created');
})
JoeyJeopardy.save( (err) => {
    if (err) console.log('Joey Jeopardy Project error' + err);
    console.log('Joey Jeopardy Project created');
})
JoeyPortfolio.save( (err) => {
    if (err) console.log('Joey Portfolio error' + err);
    console.log('Joey Portfolio created');
})
Joey.save( (err) => {
    if (err) console.log('Joey user error' +err);
    console.log('Joey user created');
})

// Save Sean
Sean.save( (err) => {
    if (err) console.log('Sean user ' + err);
    console.log('Sean created');
})

// Save Jonathan
Jonathan.save( (err) => {
    if (err) console.log('Jonathan user ' + err);
    console.log('Jonathan created');
})


// CONNECTION EVENTS
db.once('open', function() {
  console.log("Opened mongoose.");
});

db.once('close', function() {
  console.log("Closed mongoose.");
});

db.on('connected', function() {
  console.log('Mongoose connected to ' + db.host + ':' + db.port + '/' + db.name);
});

db.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

db.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

module.exports = db;