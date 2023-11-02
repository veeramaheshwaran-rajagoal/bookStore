# BOOK-STORE REST API

This is a simple Node.js application that provides a RESTful API for storing and retrieving book details

## Prerequisites
- Node.js and npm installed on your system.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/veeramaheshwaran-rajagoal/book-store.git
```


2. Navigate to the project directory:
```bash
cd your-nodejs-api
```

3. Install dependencies:
```bash
npm install
```


4. Start the application:
```bash
npm run start:dev
```

The API will be accessible at `http://localhost:3000/api/v1`.
## USER API Endpoints:
- **POST /user/userSignup**: signup as new user.
- **POST /user/login**:login to application using email,password.
- **POST /user/addUser**: Create a new user like admin or user(only by a admin user)(not authorized by normal user).
- **GET /user/getuser/:?id**: admin user user wants to see another user(normal user) otherwise not needed to pass for view our own detail.
- **GET /user/getusers**:GET ALL USERS with pagination(not authorized by normal user) .
- **PUT /user/updateUser**: UPDATE USER(profile).
- **PUT /user/updatePassword**: UPDATE A NEW PASSWORD(in profile).

## Book API Endpoints:
- **GET /book/getBooks**: Retrieve a list of book.
- **GET /book/getBook/:bookId**: Retrieve an book by ID.
- **POST /book/addBook**: Create a new book by user only(not authorized by admin).
- **PUT /book/updateBook/:bookId**: Update an book by ID(not authorized by admin).
- **DELETE /book/deleteBook/:bookId**: delete an book by ID(not authorized by admin).

Make API requests using your preferred HTTP client (e.g., cURL, Postman, or any programming language).

## Running Tests

To run the tests, use the following command:
```bash
npm test
```
