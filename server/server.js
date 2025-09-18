const express = require('express')
const app = express()
const cors = require('cors')
const mongoConnect = require('./Data-Base/connect')
mongoConnect()
const dotenv = require('dotenv')
dotenv.config()
const authRoute = require('./routes/auth-route')
const productRoute = require('./routes/product-route')

app.use(cors({
  origin: "http://localhost:5173", // your Vite dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))


app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10240mb"}));
app.use(authRoute)
app.use(productRoute)
const port = process.env.PORT  || 5000
app.listen(port , ()=>{
    console.log(`server running at http://localhost:${port}`);
    
})