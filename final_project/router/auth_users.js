const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //write code to check if the username is valid
}

const authenticatedUser = (username, password) => {
  //write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Validate user credentials
  if (authenticatedUser(username, password)) {
    // Create and sign a JWT token
    const accessToken = jwt.sign({ username: username }, "your-secret-key", { expiresIn: "1h" });

    // Save the access token in the session
    req.session.accessToken = accessToken;

    return res.status(200).json({ message: "Login successful", accessToken: accessToken });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Task 8: Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.query;
  const username = req.user.username;

  // Check if the book exists
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Check if the user has already reviewed this book
  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  // Add or modify the review
  books[isbn].reviews[username] = review;

  return res.status(200).json({ message: "Review added or modified successfully" });
});

// Task 9: Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;

  // Check if the book and review exist
  if (!books[isbn] || !books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Review not found" });
  }

  // Delete the review
  delete books[isbn].reviews[username];

  return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
