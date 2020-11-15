  
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    orderNumber:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    telephone:{
        type: String,
        required: true
    },
    productList:{
        type:Array,
        required:true
    },
    deliveryDate:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    completed:{
        type:Boolean
    },
    area:{
        type:Number,
        required: true
    },
    floorType:{
        type: String,
        required:true
    },
    location:{
        type:String,
        required:true
    }

})

const Model = mongoose.model('Order2020', Schema)

module.exports= Model