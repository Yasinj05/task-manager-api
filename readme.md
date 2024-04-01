# Task Manager Application

This is a simple task manager application built using Node.js, Express.js, MongoDB, and Mongoose.

## Overview

This project provides endpoints for managing tasks and user authentication. Key features include:

- User authentication with JWT (JSON Web Tokens)
- CRUD operations for tasks
- RESTful API design
- MongoDB database integration
- Middleware for authentication and authorization
- Error handling and validation

## How to Run the Project

### Prerequisites

Before running this project, make sure you have the following installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

### 1. Clone the repository:

```
git clone https://github.com/Yasinj05/task-manager-api.git
```

### 2. Go to the project directory:

```
cd task-manager-api
```

### 3. Install dependencies:

```
npm install
```

### 4. Start MongoDB:

```
mongod
```

### 5. Set Environment Variables:

- If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

#### On Mac:

```
export taskManager_jwtPrivateKey=yourSecureKey
```

#### On Windows:

```
set taskManager_jwtPrivateKey=yourSecureKey
```

### 6. Start the server:

```
npm start
```

### 7. Access the Application:

Once the server is running, you can access the application:

#### Users:

- **Profile:** `GET` [http://localhost:3000/api/users/me](http://localhost:3000/api/users/me)
- **All Users:** `GET` [http://localhost:3000/api/users](http://localhost:3000/api/users)
- **Register:** `POST` [http://localhost:3000/api/users](http://localhost:3000/api/users)
- **Login:** `POST` [http://localhost:3000/api/auth](http://localhost:3000/api/auth)

#### Tasks:

- **All Tasks:** `GET` [http://localhost:3000/api/tasks](http://localhost:3000/api/tasks)
- **Create Task:** `POST` [http://localhost:3000/api/tasks](http://localhost:3000/api/tasks)
- **Update Task:** `PUT` [http://localhost:3000/api/tasks/:id](http://localhost:3000/api/tasks/:id)
- **Delete Task:** `DELETE` [http://localhost:3000/api/tasks/:id](http://localhost:3000/api/tasks/:id)

#### Authentication:

- **Login:** `POST` [http://localhost:3000/api/auth](http://localhost:3000/api/auth)

Ensure to replace `:id` in the route URLs with the actual task ID when performing update or delete operations.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
