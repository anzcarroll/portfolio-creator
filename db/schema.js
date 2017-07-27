
var PortfolioSchema = Schema({
    name: String,
    projects: [ProjectSchema],
    created_at: Date,
    updated_at: Date,
    links: [LinkSchema],
    user_name: String
})

var LinkSchema = new Schema({
    url: String,
    description: String
});

var ProjectSchema = new Schema({
    name: String,
    user_name: String,
    description: String,
    imageUrl: String,
    links: [LinkSchema],
    created_at: Date,
    updated_at: Date
});

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {type: String , required: true, unique: true}, // REACH add regex
    created_at: Date,
    updated_at: Date,
    age: Integer,
    gender: String,
    user_name: String, // REACH regex
    password: String,
    portfolio: String,
    projects: [ProjectSchema],
    job_name: String
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

Project.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

Portfolio.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

var UserModel = mongoose.model("User", UserSchema);
var ProjectModel = mongoose.model("Project", ProjectSchema);
var PortfolioModel = mongoose.model("Portfolio", PortfolioSchema);
var LinkModel = mongoose.model("Link", LinkSchema);

module.exports = {
    User: UserModel,
    Project: ProjectModel,
    Portfolio: PortfolioModel,
    Link: LinkModel
};