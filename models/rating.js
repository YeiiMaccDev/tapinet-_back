const { Schema, model } = require("mongoose");

const RatingSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parkId: {
        type: Schema.Types.ObjectId,
        ref: 'Park',
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    commentStatus: {
        type: Boolean,
        default: true // True: visible to the public, False: hidden
    },
    userStatus: {
        type: Boolean,
        default: true // True: active user, False: user banned from commenting
    },
    status: {
        type: Boolean,
        default: true // True: active rating, False: deleted
    }
}, { timestamps: true });

RatingSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
};

module.exports = model('Rating', RatingSchema);
