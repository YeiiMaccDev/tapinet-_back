const { Schema, model } = require("mongoose");


const SecurityQuestionSchema = Schema({  
    questionText: {
        type: String,
        required: [true, 'La pregunta de seguridad es obligatoria.']
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

SecurityQuestionSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return {
        ...data
    };
}

module.exports = model('SecurityQuestion', SecurityQuestionSchema);