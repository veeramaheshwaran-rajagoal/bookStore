//comman functions ...
const { ObjectId } = require('mongodb');
// create document
const createDocument = async (schema, data) => {
    const result = await schema.create(data);
    return result;
};
//delete document
const deleteDocument = async (schema, id) => {
    const result = await schema.findByIdAndUpdate(id, { isActive: false });
    return result;
};
//update document
const updateDocument = async (schema, id, data) => {
    const result = await schema.findByIdAndUpdate(id, data);
    return result;
};
// get document
const getDocument = async (schema, id) => {
    const result = await schema
        .findById(id)
        .where({ isActive: true })
        .select({ createdAt: 0, updatedAt: 0 })
        .lean();
    return result;
};
// get documents
const getDocuments = async (schema) => {
    const result = await schema
        .find()
        .where({ isActive: true })
        .select({ createdAt: 0, updatedAt: 0 })
        .lean();
    return result;
};
//common service for update document by id
const updateDocumentById = async (model, Id, data) => {
    const document = await model.findByIdAndUpdate(Id, data);
    return document;
};
//common service for get user by email
const getDocumentByEmail = async (model, userEmail, userId) => {
    const condition = { email: userEmail };
    if (userId) {
        condition._id = { $ne: ObjectId(userId) };
    }
    const userInfo = await model.findOne(condition);
    return userInfo;
};
//common service for get user by phone number
const getDocumentByPhoneNumber = async (model, phoneNumber, userId) => {
    const condition = { phoneNumber: phoneNumber };
    if (userId) {
        condition._id = { $ne: ObjectId(userId) };
    }
    const document = await model.findOne(condition);
    return document;
};
//get document by id
const getDocumentById = async (model, data) => {
    const document = await model.findOne(
        { _id: data },
        { createdAt: 0, updatedAt: 0, createdBy: 0 },
    );
    return document;
};
module.exports = {
    createDocument,
    deleteDocument,
    updateDocument,
    getDocument,
    getDocuments,
    updateDocumentById,
    getDocumentByEmail,
    getDocumentByPhoneNumber,
    getDocumentById,
};
