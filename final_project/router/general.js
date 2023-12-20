const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 10: Get the list of books available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('https://api.example.com/books'); // Replace with your actual API endpoint
    const bookList = response.data;
    return res.status(200).json({ books: bookList });
  } catch (error) {
    console.error("Error fetching book list:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Task 11: Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get(`https://api.example.com/books/${isbn}`); // Replace with your actual API endpoint
    const book = response.data;
    return res.status(200).json({ book: book });
  } catch (error) {
    console.error(`Error fetching book details for ISBN ${isbn}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Task 12: Get book details based on author using async-await with Axios
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  try {
    const response = await axios.get(`https://api.example.com/books?author=${author}`); // Replace with your actual API endpoint
    const booksByAuthor = response.data;
    return res.status(200).json({ books: booksByAuthor });
  } catch (error) {
    console.error(`Error fetching book details for author ${author}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Task 13: Get book details based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    const response = await axios.get(`https://api.example.com/books?title=${title}`); // Replace with your actual API endpoint
    const booksByTitle = response.data;
    return res.status(200).json({ books: booksByTitle });
  } catch (error) {
    console.error(`Error fetching book details for title ${title}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports.general = public_users;
