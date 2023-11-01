const bookService = require('./book.service');
const { sendResponse, errorHandler } = require('../../utils/common_functions');
// Add a new book.
const addBook = async (req, res) => {
    try {
        const { body: data, userId } = req;
        const book = await bookService.getBook({ name: data.name })
        if (book)
            return sendResponse(res, true, 200, 'book already exist.');
        await bookService.addBook({ ...data, userId });
        return sendResponse(res, true, 200, 'book added successfully.');
    } catch (error) {
        errorHandler(error, res);
    }
};
// Get available book.
const getBook = async (req, res) => {
    try {
        if (Object.keys(req.query).length !== 0)
            return sendResponse(res, false, 404, 'Url not found.');
        const {
            params: { bookId },
        } = req;

        const book = await bookService.getBook(
            { _id: bookId },
            {},
        );
        if (!book) return sendResponse(res, true, 200, 'book not available.');
        return sendResponse(res, true, 200, 'book available.', book);
    } catch (error) {
        errorHandler(error, res);
    }
};
// Get a list of available books.
const getBooks = async (req, res) => {
    const {
        query: { type }, userId
    } = req;
    const books = await bookService.getBooks({}, type, userId);
    if (books.length === 0) return sendResponse(res, false, 400, 'books not available.', []);
    return sendResponse(res, true, 200, 'books available.', books);
};
// Updates the book detail for the given ID.
const updateBook = async (req, res) => {
    try {
        const {
            params: { bookId }, userId,
            body: data,
        } = req;
        const book = await bookService.getBook({ _id: bookId, userId: userId });
        if (!book) return sendResponse(res, false, 400, 'book not available.');
        await bookService.updateBook({ _id: bookId, userId: userId }, data);
        return sendResponse(res, true, 200, 'book updated successfully.');
    } catch (error) {
        errorHandler(error, res);
    }
};
module.exports = { addBook, getBook, getBooks, updateBook };
