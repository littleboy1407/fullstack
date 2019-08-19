const express = require ('express')
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
mongoose.connect('mongodb://localhost:27017/my-project',{useNewUrlParser:true,useCreateIndex:true})
    .then(()=>console.log("connect to DB"))
    .catch(err=>console.log(err))

const app = express();

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/home",require("./api/users/index"));

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})