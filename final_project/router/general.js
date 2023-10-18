const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password })
            return res.status(200).json({ message: "User successfully registered. Now you can login" })
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." })
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.send({ "Books": books })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    function findBookByISBN(isbn) {
        for (const bookId in books) {
            if (books[bookId] === books[isbn]) {
                return books[bookId];
            }
        }
        return null; // Return null if the book is not found
    }
    const book = findBookByISBN(isbn);

    if (book) {
        res.send(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }


});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const auths = req.params.author;

    function findBookByISBN(author) {
        for (const bookId in books) {
            if (books[bookId].author === author) {
                return books[bookId];
            }
        }
        return null; // Return null if the book is not found
    }
    const auth = findBookByISBN(auths);

    if (auth) {
        res.send(auth);
    } else {
        res.status(404).json({ message: "Author not found" });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const bookTitles = req.params.title;

    function findBookByISBN(title) {
        for (const bookId in books) {
            if (books[bookId].title === title) {
                return books[bookId];
            }
        }
        return null; // Return null if the book is not found
    }
    const bookTitle = findBookByISBN(bookTitles);

    if (bookTitle) {
        res.send(bookTitle);
    } else {
        res.status(404).json({ message: "Title not found" });
    }

});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    function findBookByISBN(isbn) {
        for (const bookId in books) {
            if (books[bookId] === books[isbn]) {
                return books[bookId].reviews;
            }
        }
        return null; // Return null if the book is not found
    }
    const bookReviews = findBookByISBN(isbn);

    if (bookReviews) {
        res.send(bookReviews);
    } else {
        res.status(404).json({ message: "Reviews not found" });
    }
});

module.exports.general = public_users;
