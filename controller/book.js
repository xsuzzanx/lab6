const Book = require('../models/Book');

const getBooksList = (req, res) => {
  const books = Book.getAll();
  const userId = req.session.userId;
  res.render("books", { title: "Books", userId, books });
};

const bookModel = require('../models/Book');
const userModel = require('../models/User');

exports.getBookDetails = async (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;

    const book = await bookModel.getById(bookId);
    const didUserBorrowTheBook = userId && userModel.findBorrowedBookById(bookId, userId);

    res.render('book-details', {
        title: 'Book Details',
        book,
        didUserBorrowTheBook
    });
};

exports.postBookBorrow = async (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;

    if (!userId) {
        return res.redirect('/user/set');
    }

    const book = await bookModel.getById(bookId);

    if (!book || !book.available) {
        return res.redirect('/not-found');
    }

    await userModel.borrowBook(book);
    await bookModel.borrow(bookId);

    res.redirect('/books/borrow/success');
};

exports.getBookBorrowSuccess = (req, res) => {
    res.render('success', {
        title: 'Success',
        message: 'Book borrowed successfully'
    });
};

exports.postBookReturn = async (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;

    if (!userId) {
        return res.redirect('/user/set');
    }

    const book = await bookModel.getById(bookId);

    if (!book || book.available) {
        return res.redirect('/not-found');
    }

    await userModel.returnBook(bookId);
    await bookModel.return(bookId);

    res.redirect('/books/return/success');
};

exports.getBookReturnSuccess = (req, res) => {
    res.render('success', {
        title: 'Success',
        message: 'Book returned successfully'
    });
};

module.exports = {
  getBooksList,
};