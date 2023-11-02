const jwt = require('jsonwebtoken');
const config = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs');
//function for success response
function sendResponse(res, status, statusCode, message, data) {
    return res.status(statusCode).json({ status, statusCode, message: message, data: data });
}
//function for error response
function errorHandler(err, res) {
    const response = {
        code: err.statusCode,
        message: err.message,
    };
    if (!response.code) {
        response.code = 400;
    }
    return res
        .status(response.code)
        .json({ message: `Oops,something went wrong`, error: ' ' + err });
}
//function for generate jwt token
const generateToken = (data, expireTime) => {
    const token = jwt.sign({ token: data }, config, expireTime);
    return token;
};
//function for encrypt the password
const encryptPassword = async (data) => {
    const salt = 10;
    const encryptedPassword = await bcrypt.hash(data, salt);
    return encryptedPassword;
};
//function for decrypt the password
const decryptPassword = async (data, pass) => {
    const password = await bcrypt.compare(data, pass);
    return password;
};
module.exports = {
    sendResponse,
    errorHandler,
    generateToken,
    encryptPassword,
    decryptPassword
};
