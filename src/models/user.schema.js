const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const CONFIG = require('../../config/config')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    email: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    usertype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType'
    },
    active: {
        type: Boolean,
        default: true
    },
    block: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


UserSchema.methods.getJWT = function () {
    return 'Bearer ' + jwt.sign({ user_id: this._id }, CONFIG.jwt_secret, { expiresIn: `${2}d` })
}


module.exports.user = mongoose.model('user', UserSchema);
