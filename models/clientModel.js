  
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    discount:{
        type:Number,
    },
    lastProductName:{
        type: String,
    }
})

const Model = mongoose.model('Client', Schema)

module.exports= Model