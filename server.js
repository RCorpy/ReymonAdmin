const path = require('path')
const http = require('http')
const express = require("express")
const mongoose = require('mongoose')
const OrderModel = require('./models/orderModel')
const ProductModel = require('./models/productModel')
const ClientModel = require('./models/clientModel')


const app = express()
const server = http.createServer(app) 

app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = "mongodb+srv://RCorp:44442222@cluster0.b41r5.mongodb.net/radmin?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true })

mongoose.connection.on('connected', async () =>{
    console.log("connected!")

    let order={
        name: "Reymon san",
        createdAt: new Date(),
        category:"customer",
        productName:"product4",
        deliveryDate: new Date(),
        price: 1,
        amount:20,
        total: 10
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

//delete

app.post('/deleteorder/:id', async (req, res) => {
    let deleteEntry = await OrderModel.findById({id: req.params.id}) //no se si funcionara bien el findById
    deleteEntry.delete()
})

app.post('/deleteproduct/:id', async (req, res) => {
    let deleteEntry = await ProductModel.findById({id: req.params.id})
    deleteEntry.delete()
})

app.post('/deleteclient/:id', async (req, res) => {
    let deleteEntry = await ClientModel.findById({id: req.params.id})
    deleteEntry.delete()
})

//modify, hay que buscar como se hace

app.post('/modifyorder/:id', async (req, res) => {
    let modifyEntry = await OrderModel.findById({id: req.params.id})
})

app.post('/api/:id', async (req, res) => {
    let modifyEntry = await ProductModel.findById({id: req.params.id})
})

app.post('/api/:id', async (req, res) => {
    let modifyEntry = await ClientModel.findById({id: req.params.id})
})


app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on ${PORT}`))

/*
app.get('/api', async (req, res) => {
    const data = await Model.find()
    res.json(data)
})

app.post('/api', async (req, res) => {
    let newEntry = await new Model(req.body)
    newEntry.save()
})

app.post('/api/:id', async (req, res) => {
    let deleteEntry = await Model.findOne({newID: req.params.id})
    deleteEntry.delete()
})
*/