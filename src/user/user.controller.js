const userService = require('./user.service');
const {
    sendResponse,
    errorHandler,
    decryptPassword,
    encryptPassword,
} = require('../../utils/common_functions');
//controller for login
const login = async (req, res) => {
    try {
        const {
            body: { email, password, type },
        } = req;
        const condition = { email };
        const options = {
            _id: 1,
            name: 1,
            roleType: 1,
            password: 1,
            isActive: 1
        };
        const user = await userService.getUserWithOptions(condition, options);
        if (!user)
            return sendResponse(res, false, 400, 'Please enter your registered email address.');
        const originalPassword = await decryptPassword(password, user.password);
        if (!originalPassword)
            return sendResponse(res, false, 400, 'Please enter a valid password.');
        if (user.roleType !== type) return sendResponse(res, false, 400, 'Invalid user id.');
        if (!user.isActive) return sendResponse(res, false, 400, 'Account deactivated.');
        const userToken = await userService.getUserToken(user);
        return sendResponse(res, true, 200, 'Login successful.', userToken);
    } catch (error) {
        return errorHandler(error, res);
    }
};
//controller for add user by admin user
const addUser = async (req, res) => {
    try {
        const { body: data, userId } = req;
        const user = await userService.getUser(userId.toString());
        data.createdBy = user._id;
        const password = await encryptPassword(data.password);
        data.password = password;
        const userEmail = await userService.getUserByEmail(data.email);
        if (userEmail) return sendResponse(res, false, 409, 'User email already exist.');
        const userPhoneNumber = await userService.getUserByPhoneNumber(data.phoneNumber);
        if (userPhoneNumber && data.phoneNumber)
            return sendResponse(res, false, 409, 'User phone number already exist.');
        const addUser = await userService.addUser(data);
        if (!addUser) return sendResponse(res, false, 400, 'Something went wrong.');
        return sendResponse(res, true, 200, `${data.roleType} added successfully.`);
    } catch (error) {
        return errorHandler(error, res);
    }
};
//controller for get all users
const getusers = async (req, res) => {
    try {
        const {
            userId,
            query: { pageNo, limit, role },
        } = req;
        const subAdmins = await userService.getusers(pageNo, limit, role, userId);
        if (!subAdmins) return sendResponse(res, false, 400, 'users not available.');
        return sendResponse(res, true, 200, 'users Available.', subAdmins);
    } catch (error) {
        return errorHandler(error, res);
    }
};
//controller for update user
const updateUser = async (req, res) => {
    try {
        const {
            body: data, userId
        } = req;
        const subAdmin = await userService.getUser(userId);
        if (!subAdmin) return sendResponse(res, false, 200, 'user not available.');
        const userEmail = await userService.getUserByEmail(data.email, userId);
        if (userEmail) return sendResponse(res, false, 409, 'User email already exist.');
        const userPhoneNumber = await userService.getUserByPhoneNumber(
            data.phoneNumber,
            userId,
        );
        if (userPhoneNumber && data.phoneNumber)
            return sendResponse(res, false, 409, 'Phone number already exist.');
        let message = `${subAdmin.userType} updated successfully.`;
        message =
            `${subAdmin.roleType} updated successfully.`;
        await userService.updateUser(userId, data);
        return sendResponse(res, true, 200, message);
    } catch (error) {
        console.log(error);
        return errorHandler(error, res);
    }
};
//controller for update password
const updatePassword = async (req, res) => {
    try {
        const { body: data, userId } = req;
        const user = await userService.getUser(userId);
        if (!user) return sendResponse(res, false, 200, 'user not available.');
        const userPassword = await decryptPassword(data.password, user.password);
        if (userPassword) return sendResponse(res, false, 409, 'Password already exist.');
        const newUserpassword = await encryptPassword(data.password);
        data.password = newUserpassword;
        await userService.updateUser(userId, data);
        return sendResponse(res, true, 200, 'Your password has been updated successfully.');
    } catch (error) {
        return errorHandler(error, res);
    }
};
//controller for get single user
const getUser = async (req, res) => {
    try {
        if (Object.keys(req.query).length !== 0)
            return sendResponse(res, false, 404, 'Url not found.');
        const {
            userId, params: { id }
        } = req;
        const user = await userService.getUserWithOptions({ _id: id ? id : userId }, {});
        if (!user) return sendResponse(res, false, 200, 'User not available');
        return sendResponse(res, true, 200, 'User available', user);
    } catch (error) {
        return errorHandler(error, res);
    }
};
// Signup a new user
const userSignup = async (req, res) => {
    try {
        const { body: data } = req;
        const phoneNumber = await userService.getUserByPhoneNumber(data.phoneNumber);
        if (phoneNumber) return sendResponse(res, false, 409, 'User phone number already exist.');
        const email = await userService.getUserByEmail(data.email);
        if (email) return sendResponse(res, false, 409, 'User email already exist.');
        const password = await encryptPassword(data.password);
        data.password = password;
        const user = await userService.addUser(data);
        const userToken = await userService.getUserToken(user);
        return sendResponse(res, true, 200, 'Signup successful.', userToken);
    } catch (error) {
        return errorHandler(error, res);
    }
};
//controller for delete user
const deleteUser = async (req, res) => {
    try {
        const { params: { userId }, body: { isActive } } = req;
        const user = await userService.getUser(userId);
        if (!user) return sendResponse(res, false, 200, 'user not available.');;
        await userService.updateUser(userId, { isActive: isActive });
        return sendResponse(res, true, 200, 'User Deactivated successfully.');
    } catch (error) {
        return errorHandler(error, res);
    }
};
module.exports = {
    login,
    addUser,
    getusers,
    updateUser,
    updatePassword,
    getUser,
    userSignup,
    deleteUser
};
