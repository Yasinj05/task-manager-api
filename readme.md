# Task Manager Application

This is a simple task manager application built using Node.js, Express.js, MongoDB, and Mongoose.

## Overview

The Task Manager Application allows users to manage their tasks. Users can perform CRUD (Create, Read, Update, Delete) operations on tasks. Each task consists of a name, author, description, and optional date.

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

#### 5. Start the server:

```
npm start
```

#### The server will be running at `http://localhost:3000`.

## Usage

To create a new task, send a POST request to /api/tasks with JSON data containing the task details (name, author, task, date).
To update an existing task, send a PUT request to /api/tasks/:id with JSON data containing the updated task details.
To delete a task, send a DELETE request to /api/tasks/:id.
You can also retrieve all tasks by sending a GET request to /api/tasks.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
