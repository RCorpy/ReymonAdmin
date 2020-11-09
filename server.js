const path = require('path')
const http = require('http')
const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const OrderModel = require('./models/orderModel')
const ProductModel = require('./models/productModel')
const ClientModel = require('./models/clientModel')


const app = express()
const server = http.createServer(app) 

app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));


const uri = "mongodb+srv://RCorp:44442222@cluster0.b41r5.mongodb.net/radmin?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true })

mongoose.connection.on('connected', async () =>{
    console.log("connected!")

    let order={
        name: "Reymon san",
        createdAt: "2020-10-10",
        category:"customer",
        productName:"product4",
        deliveryDate: "2020-10-10",
        price: 1,
        amount:20,
        discount: 10,
        completed: false
    }

    let product={
        name: "product4",
        price: 1
    }

    let client={
        name: "Randy Marsh",
    }

    let newOrder = await new OrderModel(order)
    //newOrder.save()

    let newProduct = await new ProductModel(product)
    //newProduct.save()

    let newClient = await new ClientModel(client)
    //newClient.save()

})

//get

app.get('/orders', async (req, res) => {
    const data = await OrderModel.find()
    res.json(data)
})

app.get('/products', async (req, res) => {
    const data = await ProductModel.find()
    res.json(data)
})

app.get('/clients', async (req, res) => {
    const data = await ClientModel.find()
    res.json(data)
})

//post

app.post('/neworder', async (req, res) => {
    let newEntry = await new OrderModel(req.body)
    newEntry.save()
})

app.post('/newproduct', async (req, res) => {
    let newEntry = await new ProductModel(req.body)
    newEntry.save()
})

app.post('/newclient', async (req, res) => {
    let newEntry = await new ClientModel(req.body)
    newEntry.save()
})

//modify, hay que buscar como se hace

app.post('/modifyorder', async (req, res) => {
    console.log(req.body)
    let modifyEntry = await OrderModel.findByIdAndUpdate(req.body.id, req.body.data)
    res.send(modifyEntry)
    
})

app.post('/modifyproduct', async (req, res) => {
    let modifyEntry = await ProductModel.findByIdAndUpdate(req.body.id, req.body.data)
})

app.post('/modifyclient', async (req, res) => {
    let modifyEntry = await ClientModel.findByIdAndUpdate(req.body.id, req.body.data)
})

//delete


app.post('/deleteorder', async (req, res) => {
    let deleteEntry = await OrderModel.findByIdAndDelete(req.body.id)
    deleteEntry.delete()
})

app.post('/deleteproduct', async (req, res) => {
    let deleteEntry = await ProductModel.findByIdAndDelete(req.body.id)
    deleteEntry.delete()
})

app.post('/deleteclient', async (req, res) => {
    let deleteEntry = await ClientModel.findByIdAndDelete(req.body.id)
    deleteEntry.delete()
})


app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on ${PORT}`))

