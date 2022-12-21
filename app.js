
const express = require("express")

const app = express()

app.use(express.json())

app.listen(5000,(req,res) => console.log("server has startedhh"))

