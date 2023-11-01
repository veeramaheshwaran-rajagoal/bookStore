const { getDocumentByEmail, getDocumentByPhoneNumber, getDocumentById, createDocument, updateDocumentById, } = require('../../service/common.services');
const { generateToken } = require('../../utils/common_functions');
const userModel = require('../models/user');
//service for get user by email
const getUserByEmail = (userEmail, userId) => {
    return getDocumentByEmail(userModel, userEmail, userId);
};
//service for get user by phone number
const getUserByPhoneNumber = (phoneNumber, userId) => {
    return getDocumentByPhoneNumber(userModel, phoneNumber, userId);
};
//service for get single user
const getUser = (data) => {
    return getDocumentById(userModel, data);
};
//service for get single user with options
const getUserWithOptions = async (condition, options) => {
    const user = await userModel.findOne(condition, options); return user;
};
//service for add user
const addUser = (data) => {
    return createDocument(userModel, data);
};
//service for  update user data by userid
const updateUser = (userId, data) => {
    return updateDocumentById(userModel, userId, data);
};
//service for get all sub admin
const getusers = async (pageNo, limit, role, userId) => {
    const pageLimit = parseInt(limit); const skip = limit * parseInt(pageNo - 1);
    const projection = { updatedAt: 0, password: 0, }; let condition = { _id: { $ne: userId } };
    if (role) { condition.roleType = role }
    let userList = await userModel.find(condition, projection).sort({ updatedAt: 'desc' }).skip(skip).limit(pageLimit).lean();
    return { userList: userList, totalCount: userList.length, };
};
//service for sign in
const getUserToken = async (user) => {
    const userId = user._id.toString();
    const token = generateToken(userId, { expiresIn: process.env.LOGINEXPTIME });
    const userToken = { token, _id: userId, name: user.name, role: user.roleType, phoneNumber: user.phoneNumber };
    return userToken;
};
module.exports = { getUserByEmail, addUser, getusers, getUser, updateUser, getUserByPhoneNumber, getUserWithOptions, getUserToken };