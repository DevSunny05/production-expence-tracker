const express=require("express")
const mongoose=require('mongoose')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const colors=require('colors')
const connectDB = require("./config/connectDB")
const path=require('path')

// config dotenv file
dotenv.config();



// rest object
const app=express();


// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());

// database call
mongoose.set('strictQuery', true);
connectDB()

// routes
// user routes
app.use('/api/v1/users',require('./routes/user-route'))
// transaction routes
app.use('/api/v1/transactions',require('./routes/transaction-routes'))

// static files
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})


// port
const PORT=8080 || process.env.PORT

// listening
app.listen(PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})