const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la localidad es obligatorio.']
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

LocationSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return {
        ...data
    };
}

module.exports = model('Location', LocationSchema);
