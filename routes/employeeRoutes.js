const express = require("express");
//Loads the Express library, the same library server.js uses. 
// You need it here to create a router.
const router = express.Router();
//Creates a mini-app just for routes
const employeeController = require("../controllers/employeeController");
//Loads your controller file. ../ goes up out of routes, then into controllers. 
// The 5 controller functions can then be used as employeeController.createEmployee,
//  and so on.
router.post("/",employeeController.createEmployee);
router.get("/",employeeController.getAllEmployees);
router.get("/:employeeId",employeeController.getEmployeeById);
router.put("/:employeeId",employeeController.updateEmployee);
router.delete("/:employeeId",employeeController.deleteEmployee);
module.exports = router;


 //server.js sends it here
//router.post("/")  matches
//employeeController.createEmployee runs
//service validates and saves
//201 response