  
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    createdAt:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    productName:{
        type:String,
        required:true
    },
    deliveryDate:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    completed:{
        type:Boolean
    }

})

const Model = mongoose.model('Order', Schema)

module.exports= Model