const path = require('path')
const cors = require('cors')
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

const app = express()
const server = http.createServer(app) 

app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.json({ limit: '50mb' }))
app.use(cors())


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
    if(req.body.override){
        const data = await ClientModel.findOneAndUpdate({telephone: req.body.data.telephone}, req.body.data)
        return res.send({message: "saved"})
    }
    const data = await ClientModel.findOne({telephone: req.body.data.telephone})
    if(!data){
        let fullData = req.body.data
        delete fullData._id
        let newEntry = await new ClientModel(fullData)
        newEntry.save()
    }
    
    res.send(data? {message: "modify?"} : {message: "saved"})
})

//modify, hay que buscar como se hace

app.post('/modifyorder', async (req, res) => {
    let year = req.body.data.orderDate.split("-")[0]
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
    let orderExists = await ClientModel.find({telephone: req.body.data.telephone})
    if(orderExists.length<1 || (orderExists.length<2 && orderExists[0]._id === req.body.data._id)){
        let modifyEntry = await ClientModel.findByIdAndUpdate(req.body.id, req.body.data)
    }
    else{
        res.send({message:"NUMBER TAKEN"})
    }
})

//delete


app.post('/deleteorder', async (req, res) => {
    let deleteEntry
    switch(req.body.date){
        case "2019":
            deleteEntry = await Order2019.findByIdAndDelete(req.body.id)
            deleteEntry.delete()
        break
        case "2020":
            deleteEntry = await Order2020.findByIdAndDelete(req.body.id)
            deleteEntry.delete()
        break
        case "2021":
            deleteEntry = await Order2021.findByIdAndDelete(req.body.id)
            deleteEntry.delete()
        break
        default:
            console.log(req.body.date)
}
})

app.post('/deleteproduct', async (req, res) => {
    let deleteEntry = await ProductModel.findByIdAndDelete(req.body.id)
    deleteEntry.delete()
})

app.post('/deleteclient', async (req, res) => {
    let deleteEntry = await ClientModel.findByIdAndDelete(req.body.id)
    deleteEntry.delete()
})

app.post('/searchcustomer', async (req, res)=> {
    let responseEntry = await ClientModel.findOne({telephone: req.body.data.telephone})
    if(responseEntry){res.send(responseEntry)}
    else{res.send({message:"NOT FOUND"})}
    
})

// -------------------------------EXCEL --------------------------------------->

const BLUE = "0000FF"
const RED = "FF0000"
const WHITE = "FFFFFF"
const BLACK = "000000"

const getLayerWeight = (layer) => {return (parseFloat(layer.kit.split(" ")) || 0 )*parseFloat(layer.amount)}

const getTotalWeight = (productList) => {
    return (
        productList.imprimacion.reduce((accumulator, element)=>{return accumulator+getLayerWeight(element)},0)+
        productList.noCharge.reduce((accumulator, element)=>{return accumulator+getLayerWeight(element)},0)+
        productList.layers.reduce((accumulator, element)=>{return accumulator+getLayerWeight(element)},0)+
        productList.threeD.reduce((accumulator, element)=>{return accumulator+getLayerWeight(element)},0)+
        productList.disolvente.reduce((accumulator, element)=>{return accumulator+getLayerWeight(element)},0)
        )
}

app.post('/toexcel', async (req, res)=>{
    
    const exlBuf = await readFileAsync("clean.xlsx");
    const data = req.body.data
    //console.log(req.body)
    XlsxPopulate.fromDataAsync(exlBuf)
    .then(workbook => {
        // Modify the workbook.
        workbook.sheet("proforma").cell("C9").value(data.customer.name);
        workbook.sheet("proforma").cell("C10").value(data.customer.address);
        workbook.sheet("proforma").cell("C11").value(data.customer.city);
        workbook.sheet("proforma").cell("C12").value(data.customer.country);
        workbook.sheet("proforma").cell("C13").value(data.customer.contact);
        workbook.sheet("proforma").cell("C14").value(data.description);

        workbook.sheet("proforma").cell("E9").value(data.customer.CIF);
        workbook.sheet("proforma").cell("E10").value(data.customer.postalCode);
        workbook.sheet("proforma").cell("E11").value(data.customer.province);
        workbook.sheet("proforma").cell("E12").value(data.customer.telephone);
        workbook.sheet("proforma").cell("E13").value(data.customer.email);

        workbook.sheet("proforma").cell("E5").value(`Nº:${data.orderNumber}`);
        workbook.sheet("proforma").cell("E6").value(`Fecha:${data.orderDate.split(".").join("/")}`);
        workbook.sheet("proforma").cell("E7").value(`${data.category}`);

        workbook.sheet("proforma").cell("E7").style("fill", {color:{rgb:RED}, fontColor: WHITE});
        // writing the productList #

        let cellRow = 19
        const currentCell = (letter="B")=> {return `${letter}${cellRow}`}
        const makeTitle = (title)=> {
            workbook.sheet("proforma").cell(currentCell()).value(title).style({ fontColor: WHITE, bold: true })//.add(title, { fontColor: WHITE });
            workbook.sheet("proforma").cell(currentCell()).style("fill", {color:{rgb:BLUE}, fontColor: WHITE, bold: true});
            cellRow = cellRow+1
        }
        const writeRow = (rowData) => {
            if(rowData.kit){workbook.sheet("proforma").cell(currentCell()).value(rowData.kit)}
            if(rowData.name){workbook.sheet("proforma").cell(currentCell("C")).value(`${rowData.name.toUpperCase()} ${rowData.color}`)}
            if(rowData.amount){workbook.sheet("proforma").cell(currentCell("D")).value(parseFloat(rowData.amount))}
            if(rowData.price){workbook.sheet("proforma").cell(currentCell("E")).value(parseFloat(rowData.price))}
            cellRow = cellRow+1
        }

        // si le metemos un objeto podemos pasar a la parte del RichText, habria que ver que hacemos en cada caso

        const writeSpecialRow = (rowData) => {
            if(rowData[0] && typeof rowData[0] !=="object"){workbook.sheet("proforma").cell(currentCell()).value(rowData[0])}
            else if (rowData[0]){
                workbook.sheet("proforma").cell(currentCell()).value(new XlsxPopulate.RichText)
            }
            if(rowData[1] && typeof rowData[1] !=="object"){workbook.sheet("proforma").cell(currentCell("C")).value(rowData[1])}
            else if (rowData[0]){
                workbook.sheet("proforma").cell(currentCell("C")).value(new XlsxPopulate.RichText)
            }
            if(rowData[2] && typeof rowData[2] !=="object"){workbook.sheet("proforma").cell(currentCell("D")).value(parseFloat(rowData[2]))}
            else if (rowData[0]){
                workbook.sheet("proforma").cell(currentCell("D")).value(new XlsxPopulate.RichText)
            }
            if(rowData[3] && typeof rowData[3] !=="object"){workbook.sheet("proforma").cell(currentCell("E")).value(parseFloat(rowData[3]))}
            else if (rowData[0]){
                workbook.sheet("proforma").cell(currentCell("E")).value(new XlsxPopulate.RichText)
            }
            cellRow = cellRow+1
        }
        const productList = data.productList
        const getAmount = (product) => {return parseFloat(productList[product].length)}
        
        const productArray= ["imprimacion", "disolvente", "layers", "noCharge", "threeD"]

        const specialNotes ={
            harina: ["Catalizador 5 a 1"],
            masCosas: ["para añadir", "mas", "cosas"]
        }

        productArray.map(product=>{
            if(getAmount(product)>0){
                makeTitle(product.toUpperCase()) // Change the title corresponding to the situation
                productList[product].map(element=>{
                    writeRow(element)
                    if(specialNotes[element.name.split(" ")[0]]){
                        writeSpecialRow(specialNotes[element.name.split(" ")[0]])
                    }
                })
            }
        })

        // EJEMPLO PARA PONER PARTE DE LA FRASE ROJA Y LA OTRA NORMAL 
    /*
        makeTitle(data.dosManos ? "DOS MANOS" : "UNA MANO")
        productList.layers.map((layer)=>{
            writeRow(layer)
            workbook.sheet("proforma").cell(currentCell()).value("Catalizador 5 a 1").style({bold:false})
            workbook.sheet("proforma").cell(currentCell("C")).value(new XlsxPopulate.RichText)
            workbook.sheet("proforma").cell(currentCell("C")).value().add("GRISES", {fontColor: RED, bold: true, fontSize: 12}).add(" 100% Sólidos (Primera y Segunda Mano)", {fontColor: BLACK, bold: true, fontSize: 12})
            cellRow = cellRow+1
        })
        */

        
        workbook.sheet("proforma").cell("D37").value(getTotalWeight(productList))
        // Write to file.

        const getYear = ()=>{
            let thisYear = new Date()
            return thisYear.getUTCFullYear()
        }
        const outFilePath = ()=>{
            let dir = `/TEKLAKE${getYear()}/${data.orderNumber}`
            if (!fs.existsSync(path.join(__dirname, dir))){
                fs.mkdir(path.join(__dirname, dir), { recursive: true }, (err)=>{
                    if(err){throw err}
                });
            }
            return path.join(__dirname, dir, `${data.orderNumber}.xlsx`)

        } //can be improved for storage
        
        const openFiles = ()=>{
            require('child_process').exec(`start "" ${path.join(__dirname, `TEKLAKE${getYear()}`,data.orderNumber)}`);
            require('child_process').exec(`start "" ${outFilePath()}`); 
        }
        
        workbook.toFileAsync(`${outFilePath()}`).then(()=>openFiles())
    });

})


app.get('/prices', async (req, res) => {
    let data = {}

    const exlBuf = await readFileAsync("prices.xlsx");
    //console.log(req.body)
    XlsxPopulate.fromDataAsync(exlBuf)
    .then(workbook => {
        const book = workbook.sheet(0)
        const bookRows = 200
        let currentRow = 18
        let settledTitle = false
        let title = ""

        while(currentRow<bookRows){
            if(book.cell(`F${currentRow}`).value() && !settledTitle){
                title = book.cell(`B${currentRow-1}`).value()
                settledTitle = true

                //remove special characters
                console.log(title)
            }

            if(!book.cell(`F${currentRow}`).value()){
                settledTitle = false
            }
            
            currentRow++
        }
        data = book.cell("F18").value()
        res.json(data)
    })
})

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on ${PORT}`))

