const path = require('path')
const http = require('http')
const express = require("express")


const app = express()
const server = http.createServer(app) 

app.get("/", (req, res)=>{
    res.send("hello")
})

app.get("/marlonsan", (req, res)=>{
    res.send("21")
})

const PORT = process.env.PORT || 3030
server.listen(PORT, () => console.log(`Server running on ${PORT}`))