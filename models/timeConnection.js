const { Schema, model } = require('mongoose');

const TimeConnectionSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio']
    },
    temporaryTime: {
        type: Number, // Tiempo en minutos o segundos, según lo necesites
        required: [true, 'El tiempo de conexión es obligatorio']
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'EXPIRED', 'PAUSED'],
        default: 'ACTIVE'
    },
    plasticCaps: {
        type: Number, // Cantidad de tapitas de plástico recolectadas
        default: 0,
        min: [0, 'La cantidad de tapitas no puede ser negativa'],
        required: [true, 'La cantidad de tapitas es obligatoria']
    },
}, { timestamps: true });

TimeConnectionSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('TimeConnection', TimeConnectionSchema);

