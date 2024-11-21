const {
    Activity,
    Park,
    Role,
    Server,
    User,
    UserSecurityAnswer,
    SecurityQuestion,
    Location,
    TimeConnection
} = require('../models');

const isValidRole = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`El rol ${role} no está registrado en la DB`);
    }
}

const existsEmail = async (email = '') => {
    const exists = await User.findOne({ email });

    if (exists) {
        throw new Error(`El email ${email}, ya está registrado.`);
    }
}


const existsUserById = async (id = '') => {
    const existsUser = await User.findById(id);

    if (!existsUser) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}

const existsTimeConnectionById = async (id = '') => {
    const existsTimeConnection = await TimeConnection.findById(id);

    if (!existsTimeConnection) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}

const existsSecurityQuestionById = async (id = '') => {
    const existsSecurityQuestion = await SecurityQuestion.findById(id);

    if (!existsSecurityQuestion) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}

const existsActivityById = async (id = '') => {
    const existsActivity = await Activity.findById(id);

    if (!existsActivity) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}


const existsLocalityById = async (id = '') => {
    const existsLocality = await Location.findById(id);

    if (!existsLocality) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}


/**
 * Validate authorized collections.
 */

const iscollectionsAuthorized = (collection = '', collections = []) => {
    const isIncluded = collections.includes(collection);
    if (!isIncluded) {
        throw new Error(`Colección (${collection}) no está autorizada, Autorizadas: ${collections}`);
    }
    return true;
}

/**
 * Validates if each array position is an object.
 */
const isArrayOfObject = (list = []) => {
    if (!list.every((item) => typeof item === 'object')) {
        throw new Error('Cada item deben ser un objeto.');
    }
    return true;
}


module.exports = {
    isValidRole,
    existsEmail,
    existsUserById,
    existsSecurityQuestionById,
    existsLocalityById,
    existsActivityById,
    existsTimeConnectionById,
    iscollectionsAuthorized,
    isArrayOfObject
}