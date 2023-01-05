
const express = require("express")
const customerRoutes = require('./routes/CustomerRoute');
const serviceRoutes = require('./routes/ServiceRoute');
const connectDB = require('./database/connect');
const mongoose = require("mongoose")
const ServiceProvider = require("./models/service-provider");
require('dotenv').config();

const app = express()


app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');
// ROUTES

app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/service-provider', serviceRoutes);

const port = 3000

app.get("/signup-service", (req,res)=>{
  res.render("signup-service")
})

app.get("/startup", (req,res)=>{
  res.render("startup")
})

app.get("/search", (req,res)=>{
  res.render("search")
})

app.get("/booking", (req,res)=>{
  res.render("booking")
})

app.get("/customer_schedule", (req,res)=>{
  res.render("customer_schedule")
})

app.get("/service_provider/:id", async (req,res)=>{
  const {id} = req.params
  const provider = await ServiceProvider.findOne({_id:id})
  res.render("service_provider", {
    provider:provider
  });
});

app.patch("/service_provider/:id", async (req,res)=>{
  const {descriptionData,aboutData} = req.body
  const {id} = req.params
  const Updateprovider = await ServiceProvider.findByIdAndUpdate(id,{description:descriptionData, about:aboutData},{runValidators:true})
});


app.get("/service_provider_schedule", (req,res)=>{
  res.render("service_provider_schedule")
})

// app.get("/signup-customer", (req,res)=>{
//   res.render("signup-customer")
// })

// app.get("/login-customer",(req,res) => res.render("login-customer"))
app.get("/login-service",(req,res) => res.render("login-service"))
app.get('/', (req, res) => {res.render('home')});




const start = async () => {
  
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();

