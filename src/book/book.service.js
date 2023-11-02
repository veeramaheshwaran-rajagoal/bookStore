const bookModel = require('../models/book');
const { createDocument } = require("../../service/common.services")
//service for add enduse
const addBook = async (data) => {
    return createDocument(bookModel, data)
};
//service for get single end use
const getBook = async (condition, projection) => {
    const endUse = await bookModel.findOne(condition).select(projection).lean();
    return endUse;
};
//service for get all end uses
const getBooks = async (projection, type, userId) => {
    const condition = { isActive: true };
    if (userId) {
        condition.userId = userId
    }
    if (type) {
        condition.type = type;
    }
    const books = await bookModel.find(condition, projection).lean();
    return books;
};
//service for update book
const updateBook = async (filterData, updateData) => {
    const endUse = await bookModel.updateOne(filterData, updateData);
    return endUse;
};
//service for delete book
const deleteBook = async (id) => {
    const endUse = await bookModel.findByIdAndDelete(id);
    return endUse;
};
module.exports = { addBook, getBook, getBooks, updateBook, deleteBook };
