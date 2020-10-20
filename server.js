const path = require('path')
const http = require('http')
const express = require("express")
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app) 

app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = "mongodb+srv://RCorp:44442222@cluster0.b41r5.mongodb.net/radmin?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true })

mongoose.connection.on('connected', () =>{ console.log("connected!")})

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on ${PORT}`))