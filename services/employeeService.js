const fs = require("fs").promises;
// loads node built-in file system module in its promise basedform
const path = require("path");
//loads the built in path module ,which build file path safely 
//across windows,linux and mac
const dataFilePath = path.join(__dirname, "../data/employees.json");
//• __dirname is the folder of the current file. 
// ".." goes up one folder, then into data/employees.json.
// This gives a correct path no matter where the app is started from.

//read employees data from the JSON file
async function readEmployees(){
    try{
        const data = await fs.readFile(dataFilePath,"utf-8");
        
        
        
        return JSON.parse(data);
    }
    catch(error){
        console.error("Error reading employees data:", error);
        throw error;
        //throw is used because whenever we call this function in the controller,
        //  we want to handle the error there and send a response to the client.
        //  If we don't throw the error, the controller will not know that an error occurred
        //  and will not be able to send an appropriate response.
    }
}
//write employees data to the JSON file
async function writeEmployees(employees){
    try{
        await fs.writeFile(dataFilePath, JSON.stringify(employees,null,2));
    }
    catch(error){
        console.error("Error writing employees data:", error);
        throw error;
    }
}
function validateEmployee(employee){
    const requiredFields = ["employeeId","name","email","department","designation","location"];
    const missingFields = [];
    for(const field of requiredFields){
        if(typeof employee[field] !== "string" || employee[field].trim() ===""){
            missingFields.push(field);
        }
    }
    return missingFields;
}
function validateOrThrow(employee){
    const missingFields = validateEmployee(employee);
    if(missingFields.length > 0){
        const error = new Error(`Missing required fields: ${missingFields.join(", ")}`);
        error.statusCode = 400;
        throw error;
    }
}
// try {
//     validateOrThrow({ name: "Ravi" });
// } catch (e) {
//     console.log(e.message);
//     console.log(e.statusCode);
// }

async function createEmployee(employeeData){
    validateOrThrow(employeeData);
    const employees = await readEmployees();
    const exists = employees.some(emp => emp.employeeId === employeeData.employeeId);

    if(exists){
        //here it checks for the duplicates 
        const error = new Error("Employee with the same ID already exists");
        error.statusCode = 409;
        throw error;
    }
    const newEmployee = {
        employeeId: employeeData.employeeId,
        name:employeeData.name,
        email:employeeData.email,
        department:employeeData.department,
        designation:employeeData.designation,
        location:employeeData.location


    };
    employees.push(newEmployee);
    await writeEmployees(employees);
    
    return newEmployee;

}
async function getAllEmployees(){
    const employees = await readEmployees();
    return employees;
    

}
async function getEmployeeById(employeeId){
    const employees = await getAllEmployees();
    const employee = employees.find(emp=> emp.employeeId === employeeId);
    if(!employee){
        const error = new Error(`Employee with id ${employeeId} not found`);
        error.statusCode = 404;
        throw error;
    
   }
   return employee;
}
async function updateEmployee(employeeId,updatedData){
    const employees = await readEmployees();
    const index = employees.findIndex(emp => emp.employeeId === employeeId);
    if(index === -1){
        const error = new Error(`Employee with id ${employeeId} not found`);
        error.statusCode = 404;
        throw error;
    }
    const updatedEmployee = {...employees[index],...updatedData,employeeId : employeeId};
    validateOrThrow(updatedEmployee);
    employees[index] = updatedEmployee;
    await writeEmployees(employees);
    return updatedEmployee;
}
async function deleteEmployee(employeeId){
    const employees = await readEmployees();
    const employee = employees.find(emp => emp.employeeId === employeeId);

    if(!employee){
        const error = new Error(`Employee with id ${employeeId} not found`);
        error.statusCode = 404;
        throw error;
    }

    const remaining = employees.filter(emp => emp.employeeId !== employeeId);
    await writeEmployees(remaining);

    return employee;
}
// createEmployee({
//     employeeId: "TEST1", name: "Ravi", email: "r@x.com",
//     department: "IT", designation: "Dev", location: "Hyd"
// }).then(r => console.log(r)).catch(e => console.log(e.statusCode, e.message));
//export the functions
// output ={ employeeId: 'TEST1',
//   name: 'Ravi',
//   email: 'r@x.com',
//   department: 'IT',
//   designation: 'Dev',
//   location: 'Hyd'
// } when i runned this for second time it gave me 409 error employee with same id have already exists
// getAllEmployees().then(list => console.log(list));
//here when i runned this to checked whether it is getting the all employees or not 
// getEmployeeById("E001").then(r => console.log(r)).catch(e => console.log(e.statusCode, e.message));
// getEmployeeById("E999").then(r => console.log(r)).catch(e => console.log(e.statusCode, e.message));
// when i ran this in the console it gave me error because there are no employees in the data so it 404 error
// updateEmployee("E001", { location: "Chennai" }).then(r => console.log(r)).catch(e => console.log(e.statusCode, e.message));
// updateEmployee("E999", { location: "Chennai" }).then(r => console.log(r)).catch(e => console.log(e.statusCode, e.message));
// updateEmployee("E002", { name: "" }).then(r => console.log(r)).catch(e => console.log(e.statusCode, e.message));
// deleteEmployee("E002").then(r => console.log(r)).catch(e => console.log(e.statusCode, e.message));
// deleteEmployee("E999").then(r => console.log(r)).catch(e => console.log(e.statusCode, e.message));
module.exports = {readEmployees, writeEmployees, validateEmployee,validateOrThrow,createEmployee,getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee};
//when we want to use those functions in other file we write those functions in module export