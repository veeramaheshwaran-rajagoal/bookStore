/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const passport = require('passport');

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    if (err || info || !user) {
        return reject({
            statusCode: 401,
            status: false,
            message: 'Please authenticate',
            data: 'Authentication code not matching',
        });
    }
    req.userId = user._id;
    req.roleType = user.roleType;
    resolve();
};

const authentication = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(
            req,
            res,
            next,
        );
    })
        .then(() => next())
        .catch((err) => res.status(401).send(err));
};

module.exports = { authentication };
