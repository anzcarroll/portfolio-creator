
var ProjectSchema = new Schema({
    name: String
});

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {type: String , required: true, unique: true}, // REACH add regex
    created_at: Date,
    updated_at: Date,
    // age: Number,
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

var UserModel = mongoose.model("User", UserSchema);
var ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = {
    User: UserModel,
    Project: ProjectModel
};