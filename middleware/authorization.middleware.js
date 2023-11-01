const authorization = (role) => {
    return (req, res, next) => {
        if (req.roleType === role) {
            return next();
        }
        res.status(401).json({ status: false, statusCode: 401, message: 'Unauthorized' });
    };
};
module.exports = { authorization }
