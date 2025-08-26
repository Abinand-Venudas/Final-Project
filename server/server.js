const express = require('express')
const app = express()
const mongoConnect = require('./Data-Base/connect')
mongoConnect()
const dotenv = require('dotenv')
dotenv.config()
const authRoute = require('./routes/auth-route')


app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10240mb"}));
app.use(authRoute)
const port = process.env.PORT  || 5000
app.listen(port , ()=>{
    console.log(`server running at http://localhost:${port}`);
    
})