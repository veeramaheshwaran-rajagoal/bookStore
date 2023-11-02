const express = require('express');
const route = express.Router();
const { validate } = require('../../middleware/validation');
const { authentication } = require('../../middleware/authentication.middleware');
const { authorization } = require('../../middleware/authorization.middleware');
const schema = require('./user.validate.schema');
const {
    login,
    addUser,
    getusers,
    getUser,
    updateUser,
    updatePassword,
    userSignup,
    deleteUser
} = require('./user.controller');
//route for login
route.post('/login', validate(schema.adminLoginSchema), login);
//route for add admin accessed by only admin user
route.post('/addUser', authentication, authorization("admin"), validate(schema.addUserSchema), addUser);
//route for get all users accessed by only admin user
route.get('/getusers', authentication, authorization("admin"), validate(schema.getusersSchema), getusers);
//route for get user
route.get('/getUser/:?id', authentication, getUser);
//route for update user
route.put(
    '/updateUser',
    authentication,
    validate(schema.updateUserSchema),
    updateUser,
);
//route for update password
route.put('/updatePassword', authentication, validate(schema.updatePasswordSchema), updatePassword);
//route for signup
route.post('/userSignup', validate(schema.userSignupValidationSchema), userSignup);
//route for delete user(soft delete)
route.put('/deleteUser/:userId', authentication, authorization("admin"), validate(schema.deleteUserSchema), deleteUser);
module.exports = route;
