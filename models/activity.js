const { Schema, model } = require("mongoose");

const ActivitySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la actividad es obligatorio.']
    },
    description: {
        type: String,
        required: [true, 'La descripción de la actividad es obligatoria.']
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

ActivitySchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
}

module.exports = model('Activity', ActivitySchema);
