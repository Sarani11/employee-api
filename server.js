const express = require("express");
//loads express library(it is listed in your package.json)
const employeeRoutes = require("./routes/employeeRoutes");
//loads  your route file

const app = express();
//creates server app

app.use(express.json());
//parses the json request body and makes it available as req.body
//without it create and update will not work
app.use("/employees", employeeRoutes);
//sends every url that starts with /employees to routes file

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
//start the server on port 3000