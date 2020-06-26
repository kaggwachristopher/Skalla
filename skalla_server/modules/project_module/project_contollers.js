//requiring dependencies
const Project = require("./project_model");

//get all projects
exports.projectList = function(req, res){
    Project.find({}, function (project, next){
      if(next){
        res.send(next);
      }else{
        res.json(project);
      }
    });
  };

//create project
exports.createProject = function(req, res){
    const newProject = new Project (req.body);
    newProject.save(function(project, next){
      if(next){
        res.send(next);
      }else{
        res.json(project);
      }
    });
  };

//get single project
exports.getProject =async function(req, res){
  try {
  const project=await Project.find({_id:req.params.projectId});
  res.json(project);
  } catch (error) {
    
  }
  
};

//get single project
exports.updateProject =async function(req, res){
  try {
  const project=await Project.updateOne({_id:req.params.projectId},req.body);
  res.json(project);
  } catch (error) {
    
  }
  
};