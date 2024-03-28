# Task Manager Application

This is a simple task manager application built using Node.js, Express.js, MongoDB, and Mongoose.

## Overview

The Task Manager Application allows users to create, update, delete, and view tasks. Users can also register an account and authenticate to perform these actions.

## How to Run the Project

### Prerequisites

Before running this project, make sure you have the following installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

#### 1. Clone the repository:

```
git clone https://github.com/Yasinj05/task-manager-api.git
```

#### 2. Go to the project directory:

```
cd task-manager-api
```

#### 3. Install dependencies:

```
npm install / npm i
```

#### 4. Start MongoDB:

```
mongod
```

#### 5. Set Environment Variables:

- If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

##### On Mac:

```
export vidly_jwtPrivateKey=yourSecureKey
```

##### On Windows:

```
set vidly_jwtPrivateKey=yourSecureKey
```

#### 6. Start the server:

```
npm start
```

#### 7. Access the Application:

- Once the server is running, you can access the application:
- Users: `http://localhost:3000/api/users`
- Tasks: `http://localhost:3000/api/tasks`
- Authentication: `http://localhost:3000/api/auth`

## Explanation

The project uses Node.js with Express.js for the backend and MongoDB as the database. It follows a RESTful API design pattern for managing tasks and users. Authentication is implemented using JWT tokens, and user passwords are securely hashed using bcrypt.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
