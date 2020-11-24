  
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    orderNumber: {
        type: String
        
    },
    customer: {
        type: Object
    },
    description:{
        type: String
    },
    status: {
        type: String
    },
    extraNotes: {
        type: String
    },
    category: {
        type: String
    },
    productList: {
        type: Object,
    },
    orderDate: {
        type: String
    },
    area: {
        type: Number
    },
    resinType: {
        type: String
    },
    discount: {
        type: Number
    },
    completed: {
        type: Boolean
    }

})

const Model = mongoose.model('Order2019', Schema)

module.exports= Model