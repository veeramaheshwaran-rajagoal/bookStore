const joi = require('joi');
//add end use schema
const addBookSchema = joi
    .object({
        body: joi.object({
            name: joi.string().strict().trim().required(),
            author: joi.string().strict().trim().required(),
            discription: joi.string().strict().trim().required(),
            type: joi.string().strict().trim().required(),
        }),
    })
    .unknown(true);
// Get the end - use schema.
const getBookSchema = joi
    .object({
        params: joi.object({
            bookId: joi.string().strict().trim().required(),
        }),
    })
    .unknown(true);
// Get the end - use schema.
const getBooksSchema = joi
    .object({
        query: joi.object({
            userId: joi.string().strict().trim().optional(),
            type: joi.string().strict().trim().optional(),
        }),
    })
    .unknown(true);

// Update Book id
const updateBookSchema = joi
    .object({
        body: joi.object({
            name: joi.string().strict().trim().optional(),
            author: joi.string().strict().trim().optional(),
            discription: joi.string().strict().trim().optional(),
            type: joi.string().strict().trim().optional(),
        }),
        params: joi.object({
            bookId: joi.string().strict().trim().required(),
        }),
    })
    .unknown(true);
// Get the end - use schema.
const deleteBookSchema = joi
    .object({
        params: joi.object({
            bookId: joi.string().strict().trim().required(),
        }),
    })
    .unknown(true);
module.exports = { addBookSchema, getBookSchema, updateBookSchema, deleteBookSchema, getBooksSchema };
