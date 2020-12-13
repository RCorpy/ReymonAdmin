  
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    telephone:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    postalCode:{
        type: String
    },
    address:{
        type: String
    },
    city:{
        type: String
    },
    province:{
        type: String
    },
    country:{
        type: String
    },
    contact:{
        type: String,
    },
    CIF:{
        type: String
    },
    email:{
        type: String
    },


})

const Model = mongoose.model('Client', Schema)

module.exports= Model

