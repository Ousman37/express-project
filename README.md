## Express-based Contacts Backend API

Welcome to the Contacts Backend API! This is an Express-based backend API for managing your contacts. With this API, you can easily perform CRUD operations on a database of contacts, all with secure password hashing and user authentication using JSON Web Tokens.

[![dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)](https://github.com/Ousman37/express-project)
[![bcrypt](https://img.shields.io/badge/bcrypt-%5E5.1.0-blue.svg)](https://www.npmjs.com/package/bcrypt)
[![dotenv](https://img.shields.io/badge/dotenv-%5E16.0.3-yellow.svg)](https://www.npmjs.com/package/dotenv)
[![express](https://img.shields.io/badge/express-%5E4.18.2-red.svg)](https://www.npmjs.com/package/express)
[![express-async-handler](https://img.shields.io/badge/express--async--handler-%5E1.2.0-orange.svg)](https://www.npmjs.com/package/express-async-handler)
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-%5E9.0.0-blueviolet.svg)](https://www.npmjs.com/package/jsonwebtoken)
[![mongoose](https://img.shields.io/badge/mongoose-%5E7.0.4-green.svg)](https://www.npmjs.com/package/mongoose)
[![devDependencies](https://img.shields.io/badge/devDependencies-up%20to%20date-brightgreen.svg)](https://github.com/Ousman37/express-project)

This is an Express-based backend API for managing contacts. Here are some of the features that make this API great:




## Features
- User authentication and authorization using JSON Web Tokens
- CRUD operations on a database of contacts
- Built with the popular and robust Express framework
- Asynchronous request handling with express-async-handler
- Secure password hashing using bcrypt
- Configuration management with dotenv
- Object Data Modeling with Mongoose

## Installation
1. Clone the repository: `git clone https://github.com/Ousman37/express-project.git`.
2. Install the dependencies: `npm install`.
3. Start the server: `npm run start`

    
## Scripts
- `start`: Starts the server by running `node server.js`.
- `dev`: Starts the server using nodemon, which will watch for changes and restart the server automatically.

## Installation
1. Clone the repository: `git clone https://github.com/Ousman37/express-project.git`.
2. Install the dependencies: `npm install`.
3. Set the environment variables in a `.env` file. Example:
    ```
    MONGODB_URI=your_mongodb_uri_here
    JWT_SECRET=your_secret_here
    ```
4. Start the server: `npm start` or `npm run dev`.

## Endpoints
The API has the following endpoints:
- `GET /api/contacts`: Retrieves all contacts.
- `GET /api/contacts/:id`: Retrieves a specific contact by ID.
- `POST /api/contacts`: Creates a new contact.
- `PUT /api/contacts/:id`: Updates a specific contact by ID.
- `DELETE /api/contacts/:id`: Deletes a specific contact by ID.




## Usage

The API provides the following endpoints:
### GET /api/contacts

Returns an array of all contacts.
### GET /api/contacts/:id

Returns the contact with the specified ID.
### POST /api/contacts

Creates a new contact.
### PUT /api/contacts/:id

Updates the contact with the specified ID.
### DELETE /api/contacts/:id

Deletes the contact with the specified ID.
### POST /api/users/login

Logs in the user with the specified email and password and returns a JSON Web Token.
### POST /api/users/register

Registers a new user and returns a JSON Web Token.
## Technologies Used

This API uses the following technologies:

    Node.js
    Express.js
    MongoDB
    Mongoose.js
    bcrypt.js
    JSON Web Tokens
    dotenv
##  License

This project is licensed under the ISC License. See the LICENSE file for more information.

Thanks for checking out the Contacts Backend API! If you have any questions or comments, feel free to get in touch.
