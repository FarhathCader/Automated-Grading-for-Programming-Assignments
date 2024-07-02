# Automated-Grading-for-Programming-Assignments

# MERN Application

This is a MERN (MongoDB, Express.js, React, Node.js) stack application.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm are installed. You can download them from [here](https://nodejs.org/).
- MongoDB is installed and running. You can download it from [here](https://www.mongodb.com/try/download/community).

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/mern-app.git
    cd mern-app
    ```

2. Install server dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install client dependencies:
    ```bash
    cd ../client
    npm install
    ```

## Configuration

1. Create a `.env` file in the `server` directory and complete the following:
    ```env
    PORT=4000
    MONGO_URI=""
    ACCESS_TOKEN=""
    OAUTH_REFRESH_TOKEN=""
    OAUTH_CLIENT_SECRET=""
    OAUTH_CLIENTID=""
    MAIL_PASSWORD=""
    MAIL_USERNAME=""
    CLOUD_NAME=""
    CLOUD_KEY=""
    CLOUD_KEY_SECRET=""
    ```

#create a cludinary api key and complete above .env for last three variables 

## Running the Application

1. Start the backend server:
    ```bash
    cd server
    npm run dev
    ```

2. Start the frontend server:
    ```bash
    cd ../client
    npm start
    ```

3. Open your browser and go to `http://localhost:3000` to see the application running.

## Folder Structure

```plaintext
mern-app/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
