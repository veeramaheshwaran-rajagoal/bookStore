const express = require('express');
const { validate } = require('../../middleware/validation');
const bookController = require('./book.controller');
const bookSchema = require('./book.validation');
const router = express.Router();
const { authentication } = require('../../middleware/authentication.middleware');
const { authorization } = require('../../middleware/authorization.middleware');
//route for add book
router.post('/addBook', authentication, authorization('user'), validate(bookSchema.addBookSchema), bookController.addBook);
//route for Get the book
router.get(
    '/getBook/:bookId', authentication,
    validate(bookSchema.getBookSchema),
    bookController.getBook,
);
//route for get all books
router.get('/getBooks', authentication, validate(bookSchema.getBooksSchema), bookController.getBooks);
// route for update book
router.put(
    '/updateBook/:bookId', authentication, authorization('user'),
    validate(bookSchema.updateBookSchema),
    bookController.updateBook,
);
// route for delete book
router.delete(
    '/deleteBook/:bookId', authentication, authorization('user'),
    validate(bookSchema.deleteBookSchema),
    bookController.deleteBook,
);
module.exports = router;
