const path = require('path')
const http = require('http')
const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Order2019 = require('./models/order2019')
const Order2020 = require('./models/order2020')
const Order2021 = require('./models/order2021')
const ProductModel = require('./models/productModel')
const ClientModel = require('./models/clientModel')


const XlsxPopulate = require('xlsx-populate');

const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

/*(async function() {

    const exlBuf = await readFileAsync("PRESUPUESTO 6230.xlsx");
    console.log(exlBuf)
    XlsxPopulate.fromDataAsync(exlBuf)
    .then(workbook => {
        // Modify the workbook.
        workbook.sheet("proforma").cell("D19").value(2);

        // Write to file.
        return workbook.toFileAsync("./out.xlsx");
    });
})()*/




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
        orderNumber: "01118601NN",
        customer:{
          telephone:"456798",
          name: "Demo NEW",
          postalCode: "46005",
          address: "C/something",
          city: "Valencia",
          province: "Valencia",
          country: "Spain",
          contact: "Mr. Demo",
          CIF: "03921841L",
          email: "asdasd@fasd.com",
        },
        description: "",
        status: "proforma",
        extraNotes: "",
        category: "Naves",
        productList: [{name: "HS100", color:"white", amount: "2", price: 27, kit: "20Kgs"}, {name: "Disolvente", color:"none", amount: "1", price: 3, kit: "1L"}],
        orderDate: "2020-10-21",
        area: 200,
        resinType: "Acrilica",
        discount: 50,
        completed: false
      }

    let product={
        name: "product4",
        price: 1
    }

    let client={
        telephone:"456798",
        name: "Demo CLIENT",
        postalCode: "46005",
        address: "C/something",
        city: "Valencia",
        province: "Valencia",
        country: "Spain",
        contact: "Mr. Demo",
        CIF: "03921841L",
        email: "asdasd@fasd.com",
      }

    let newOrder = await new Order2021(order)
    //newOrder.save()

    let newProduct = await new ProductModel(product)
    //newProduct.save()

    let newClient = await new ClientModel(client)
    //newClient.save()

})

//get

app.get('/orders/:year', async (req, res) => {
    const year = req.params.year

    let data2019 = data2020 = data2021 = []

    if(year === "2019" || year==="all") {data2019 = await Order2019.find()}
    if(year === "2020" || year==="all") {data2020 = await Order2020.find()}
    if(year === "2021" || year==="all") {data2021 = await Order2021.find()}

    const data= data2019.concat(data2020, data2021)
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
    let newEntry
    if(req.body.year === "2019") {newEntry = await new Order2019(req.body.data)}
    if(req.body.year === "2020") {newEntry = await new Order2020(req.body.data)}
    if(req.body.year === "2021") {newEntry = await new Order2021(req.body.data)}

    newEntry.save()
})

app.post('/newproduct', async (req, res) => {
    const data = await ClientModel.findOne({name: req.body.data.name})
    console.log(data)
    if(!data){
    let newEntry = await new ProductModel(req.body.data)
    newEntry.save()}
})

app.post('/newclient', async (req, res) => {
    const data = await ClientModel.findOne({telephone: req.body.telephone})
    if(!data){
        let fullData = req.body.data
        fullData.telephone = req.body.telephone
        let newEntry = await new ClientModel(fullData)
    newEntry.save()}
})

//modify, hay que buscar como se hace

app.post('/modifyorder', async (req, res) => {
    console.log(req.body.data)
    let year = req.body.data.orderDate.split("-")[0]
    console.log(year)

    if(year === "2019"){
        let modifyEntry = await Order2019.findByIdAndUpdate(req.body.id, req.body.data)
        res.send(modifyEntry)
    }
    if(year === "2020"){
        let modifyEntry = await Order2020.findByIdAndUpdate(req.body.id, req.body.data)
        res.send(modifyEntry)
    }
    if(year === "2021"){
        let modifyEntry = await Order2021.findByIdAndUpdate(req.body.id, req.body.data)
        res.send(modifyEntry)
    }
})

app.post('/modifyproduct', async (req, res) => {
    let modifyEntry = await ProductModel.findByIdAndUpdate(req.body.id, req.body.data)
})

app.post('/modifyclient', async (req, res) => {
    let modifyEntry = await ClientModel.findByIdAndUpdate(req.body.id, req.body.data)
})

//delete


app.post('/deleteorder', async (req, res) => {
    let deleteEntry = await Order2020.findByIdAndDelete(req.body.id)
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

// -------------------------------EXCEL --------------------------------------->

app.post('/toexcel', async (req, res)=>{
    
    const exlBuf = await readFileAsync("clean.xlsx");
    //console.log(req.body)
    XlsxPopulate.fromDataAsync(exlBuf)
    .then(workbook => {
        // Modify the workbook.
        workbook.sheet("proforma").cell("C9").value(req.body.data.customer.name);

        // Write to file.
        return workbook.toFileAsync("./out.xlsx");
    });

})


app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on ${PORT}`))

