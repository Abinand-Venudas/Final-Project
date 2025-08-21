const express = require('express')
const app = express()
const mongoConnect = require('./Data-Base/Models/connect')
mongoConnect()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10240mb"}));
const port = process.env.PORT  || 4000
app.listen(port , ()=>{
    console.log(`server running at http://localhost:${port}`);
    
})