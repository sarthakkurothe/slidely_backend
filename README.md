# Windows Desktop App - Backend

This is the backend for the Windows Desktop App. It is built using Node.js and Express, and it allows for the creation, reading, updating, and deletion of submissions. It also supports searching submissions by email.

## Features

- Submit a new form
- Read a specific submission
- Read all submissions
- Edit a submission
- Delete a submission
- Search for submissions by email

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.x or later)
- [npm](https://www.npmjs.com/get-npm) (v6.x or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sarthakkurothe/slidely_backend
   cd slidely_backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Configuration
Ensure you have a `db.json` file in the root of your project directory. This file will act as your database. The structure should look like this:

   ```bash
   {
     "submissions": []
   }
   ```

## Running the server

To start the server, run:

  ```bash
  npm run dev
  ```

The server will start on port 3000 by default. You can access it at http://localhost:3000.

## API Endpoints

### Ping
- **URL:** `/ping`
- **Method:** `GET`
- **Description:** Check if the server is running.

### Submit a New Form
- **URL:** `/submit`
- **Method:** `POST`
- **Description:** Submit a new form.
- **Request Body:**
  
  ```bash
  {
    "name": "test",
    "email": "test@gmail.com",
    "phone": "1234567890",
    "github_link": "https://github.com/test",
    "stopwatch_time": "00:10:15"
  }
  ```

### Read a Specific Submission

- **URL:** `/read`
- **Method:** `GET`
- **Description:** Read a specific submission by index.
- **Query Parameters:**
  - `index` (required): The index of the submission to read.


### Read All Submissions

- **URL:** `/submissions`
- **Method:** `GET`
- **Description:** Read all submissions.

### Edit a Submission

- **URL:** `/edit`
- **Method:** `PUT`
- **Description:** Edit an existing submission.
- **Request Body:**

  ```bash
  {
    "name": "test",
    "email": "test@gmail.com",
    "phone": "0987654321",
    "github_link": "https://github.com/test",
    "stopwatch_time": "00:20:30"
  }
  ```

### Delete a Submission

- **URL:** `/delete`
- **Method:** `DELETE`
- **Description:** Delete a submission by email.
- **Query Parameters:**
  - `email` (required): The email of the submission to delete.

### Search for Submissions by Email

- **URL:** `/search`
- **Method:** `GET`
- **Description:** Search for submissions by email.
- **Query Parameters:**
  - `email` (required): The email to search for.

## Project Structure

   ```bash
   slidely-backend/
├── db.json
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    └── routes.ts
   ```

- `db.json` : JSON file acting as a simple database.
- `package.json` : Contains project metadata and dependencies.
- `routes.ts` : Defines the API endpoints and their logic.
- `index.ts` :Entry point for the server.

