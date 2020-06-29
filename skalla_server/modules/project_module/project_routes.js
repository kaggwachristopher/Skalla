//requiring dependecies
const express = require("express");
const router = express.Router(); //express router for routing
const projectController = require("./project_contollers");
const loginController = require("../user_module/loginController");

//get all projects
router.get(
  "/projects",
  // loginController.CheckToken,
  projectController.projectList
);

//create project
router.post(
  "/project",
  loginController.CheckToken,
  projectController.createProject
);

//get single project
router.get(
  "/projects/:projectId",
  // loginController.CheckToken,
  projectController.getProject
);

//add project setup
router.put(
  "/projects/:projectId",
  // loginController.CheckToken,
  projectController.updateProject
);

module.exports = router;
