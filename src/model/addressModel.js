const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    surname: String,
    mobile1: Number,
    mobile2: Number,
    landline: Number,
    doorNo: String,
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
})

const address = mongoose.model('address', addressSchema)

export default address
