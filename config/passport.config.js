const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const userModel = require('../src/models/user');

const jwtOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        const user = await userModel.findOne({
            _id: payload.token,
            isActive: true,
        });
        if (!user) return done(null, false);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};
