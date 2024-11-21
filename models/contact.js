const { Schema, model } = require("mongoose");

const ContactSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'El título es obligatorio.']
    },
    message: {
        type: String,
        required: [true, 'El mensaje es obligatorio.']
    },
    response: {
        type: String,
        default: ''
    },
    responseStatus: {
        type: String,
        enum: ['pendiente', 'respondido'],
        default: 'pendiente'
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

ContactSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
};

module.exports = model('Contact', ContactSchema);
