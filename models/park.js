const { Schema, model } = require("mongoose");

const ParkSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre del parque es obligatorio.']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria.']
    },
    address: {
        type: String,
        required: [true, 'La dirección es obligatoria.']
    },
    latitude: {
        type: Number,
        required: [true, 'La latitud es obligatoria.']
    },
    longitude: {
        type: Number,
        required: [true, 'La longitud es obligatoria.']
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    images: [{
        type: String
    }],
    locality: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, 'La localidad es obligatoria.']
    },
    activities: [{
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

ParkSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
}

module.exports = model('Park', ParkSchema);
