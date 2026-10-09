const employeeService = require("../services/employeeService");
//loads the service file so the controller can call its functions
async function createEmployee(req, res) {
    //req is taken from client res will send back the response
    try {
        const newEmployee = await employeeService.createEmployee(req.body);
        //Takes the data the client sent (req.body) and passes it to the service function. 
        // await waits until the service finishes (validate, duplicate check, save).
        //  The saved employee is stored in newEmployee.
        res.status(201).json({
            message: "Employee created successfully",
            data: newEmployee
        });
    }
    catch (error) {
         handleError(error,res);
        // res.status(error.statusCode || 500).json({ message: error.message });
        //                                      sends the error text back to the client such as missing fields required
    }
}
async function getAllEmployees(req, res) {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json({
            data: employees
        });
    }
        catch (error) {
             handleError(error,res);
        }
}
async function getEmployeeById(req,res){
    try{
        const employee = await employeeService.getEmployeeById(req.params.employeeId);
        res.status(200).json({
            data : employee
        });
    }
    catch(error){
        handleError(error,res);
    }
}
async function updateEmployee(req,res){
    try{
        const updatedEmployee = await employeeService.updateEmployee(req.params.employeeId,req.body);
        res.status(200).json({
            message :"Employee updated successfully",
            data : updatedEmployee 
        });
    }
    catch(error){
         handleError(error,res);

    }
}
async function deleteEmployee(req,res){
    try{
        await employeeService.deleteEmployee(req.params.employeeId);
        res.status(200).json({
            message : "Employee deleted successfully",

        });
    }
    catch(error){
        handleError(error,res);
    }
}
function handleError(error, res) {
    res.status(error.statusCode || 500).json({ message: error.message });
}
module.exports = {createEmployee,getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee};