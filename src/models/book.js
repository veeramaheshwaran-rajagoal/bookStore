const { model, Schema } = require('mongoose');
const constants = require('../../utils/constants');
const bookSchema = new Schema(
    {
        name: { type: String, required: true },
        author: { type: String, required: true },
        discription: { type: String, required: true },
        isActive: { type: Boolean, required: true, default: true },
        userId: {
            type: Schema.Types.ObjectId,
            ref: constants.USER,
        },
        type: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
module.exports = model(constants.Book, bookSchema);
