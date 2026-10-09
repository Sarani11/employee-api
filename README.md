# Employee Management API

A simple REST API built with JavaScript and Node.js. It performs CRUD operations (Create, Read, Update, Delete) on employee data. There is no database. The data is stored in a JSON file.

## Technologies

- JavaScript
- Node.js
- Express
- JSON file for data storage
- Postman for API testing
- Git for source control

## Employee Data

Every employee has these fields. All of them are required and must be non-empty strings.

| Field | Description |
|-------|-------------|
| employeeId | Unique employee ID |
| name | Employee name |
| email | Employee email |
| department | Department |
| designation | Designation |
| location | Location |

Example:

```json
{
  "employeeId": "E1001",
  "name": "John",
  "email": "john@example.com",
  "department": "IT",
  "designation": "Developer",
  "location": "Hyderabad"
}
```

## Project Structure

```
employee-api/
├── server.js                  # starts the server
├── routes/
│   └── employeeRoutes.js      # matches the URL and method to a controller
├── controllers/
│   └── employeeController.js  # reads the request and sends the response
├── services/
│   └── employeeService.js     # validation, duplicate check, read/write the file
├── data/
│   └── employees.json         # stores the employee data
├── package.json
└── README.md
```

## How It Works

```
Postman → Route → Controller → Service → employees.json
                                              ↓
Postman ← JSON response ← Controller ← Service
```

- **Route:** decides which controller runs for each method and URL.
- **Controller:** takes data from the request, calls the service, and sends the response with the right status code.
- **Service:** validates the data, checks for duplicates, reads and writes the JSON file, and throws errors with status codes.

## How to Run

1. Open a terminal in the `employee-api` folder.
2. Install the dependencies:

```
npm install
```

3. Start the server:

```
node server.js
```

4. The server runs at `http://localhost:3000`.

## API Endpoints

| Action | Method | URL | Success |
|--------|--------|-----|---------|
| Create employee | POST | /employees | 201 Created |
| Get all employees | GET | /employees | 200 OK |
| Get one employee | GET | /employees/:employeeId | 200 OK |
| Update employee | PUT | /employees/:employeeId | 200 OK |
| Delete employee | DELETE | /employees/:employeeId | 200 OK |

For POST and PUT, send the data as JSON in the request body. The employee ID in the URL is used for PUT, so it is not needed in the body.

## Error Codes

| Status | Meaning | When it happens |
|--------|---------|-----------------|
| 400 | Bad Request | A required field is missing or empty |
| 404 | Not Found | The employee ID does not exist |
| 409 | Conflict | An employee with the same ID already exists |
| 500 | Internal Server Error | An unexpected error, such as a file error |

Error responses look like this:

```json
{ "message": "Employee with id E9999 not found" }
```

## Testing

All APIs were tested with Postman. The test flow:

1. Create employee E1001 (201)
2. Get all employees
3. Get employee E1001
4. Update employee E1001
5. Get E1001 again to check the update
6. Delete employee E1001
7. Get E1001 again (404)
8. Create E1001 twice (409 on the second try)