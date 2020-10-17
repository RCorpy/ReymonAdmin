const path = require('path')
const http = require('http')
const express = require("express")


const app = express()
const server = http.createServer(app) 

app.use(express.static(path.join(__dirname, 'client/build')))

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on ${PORT}`))