const { model, Schema } = require('mongoose');
const constants = require('../../utils/constants');
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        roleType: { type: String, required: true, enum: ['admin', 'user'] },
        createdBy: {
            type: Schema.Types.ObjectId,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        phoneNumber: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
module.exports = model(constants.USER, userSchema);
