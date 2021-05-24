const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        surname: String,
        mobile1: Number,
        Mobile2: Number,
        landline: Number,
        doorNo: Number,
        houseName: String,
        streetName: String,
        road: String,
        area: String,
        landmark: String,
        city: String,
        state: {
            type: String,
            default: 'Karnataka',
        },
        country: {
            type: String,
            default: 'India',
        },
        pincode: Number,
    },
    { timestamps: true }
)

module.exports = mongoose.model('address', addressSchema)
