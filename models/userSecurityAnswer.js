const { Schema, model } = require("mongoose");

const UserSecurityAnswerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Referecia al modelo de usuario
        required: [true, 'El ID de usuario es obligatorio.']
    },
    securityQuestionId: {
        type: Schema.Types.ObjectId,
        ref: 'SecurityQuestion', // Referencia al modelo de preguntas de seguridad
        required: [true, 'La pregunta de seguridad es obligatoria.']
    },
    answer: {
        type: String,
        required: [true, 'La respuesta es obligatoria.']
    },
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

UserSecurityAnswerSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return {
        ...data
    };
}

module.exports = model('UserSecurityAnswer', UserSecurityAnswerSchema);