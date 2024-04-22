const Book = require('../models/Book');

const getBooksList = (req, res) => {
  const books = Book.getAll();
  const userId = req.session.userId;
  res.render("books", { title: "Books", userId, books });
};

module.exports = {
  getBooksList,
};