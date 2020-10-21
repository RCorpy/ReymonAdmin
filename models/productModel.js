  
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    }
})

const Model = mongoose.model('Product', Schema)

module.exports= Model