const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const PetSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    missing: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);