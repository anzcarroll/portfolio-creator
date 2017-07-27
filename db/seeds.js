var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolio-creator');

var User = require('../models/user');
var Project = require('../models/project');
var Portfolio = require('../models/portfolio');

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

var ashleigh = new User({
    first_name: 'Ashleigh',
    last_name: 'Carroll',
    email: 'anzcarroll@gmail.com',
    created_at: '',
    updated_at: '',
    age: 24,
    gender: 'F',
    user_name: 'World-Crusher',
    password: 'badasskittens',
    portfolio: 'Ashleigh Carroll Portfolio',
    job_name: "Web Developer"
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
    portfolio: 'Joey Hurley Portfolio',
    job_name: "Web Developer"
});

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
    portfolio: 'Sean\'s Portfolio',
    job_name: "Full Stack Web Developer"
});

var Jonathan = new User({
    first_name: 'Jonathan',
    last_name: 'Watson',
    email: 'kittensandcuddles@gmail.com',
    created_at: '',
    updated_at: '',
    age: 29,
    gender: 'M',
    user_name: 'TheBoss',
    password: 'badasskittens',
    portfolio: 'Jonathan Watson\'s Portfolio',
    job_name: "Web Developer"
});

var JoeyPortfolio = new Portfolio({
    name: '',
    projects: '',
    created_at: '',
    updated_at: '',
    links: '',
    user_name: ''
});

var JoeyPortfolioLinkGitHub = new Link({
    url: 'https://github.com/jchurley95',
    description: 'Link to my GitHub'
});

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