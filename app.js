
const express = require("express")
const customerRoutes = require('./routes/CustomerRoute');
const serviceRoutes = require('./routes/ServiceRoute');
const viewRoutes = require('./routes/views') 
const connectDB = require('./database/connect');

const cookieParser = require("cookie-parser");
const middleware = require("./middleware/middleware")
const mongoose = require("mongoose")

const ServiceProvider = require("./models/service-provider");
const Booking = require("./models/booking");

require('dotenv').config();

const app = express()

const {checkUser,serviceProviderAuth} = require("./middleware/middleware")


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

app.set('view engine', 'ejs');
// ROUTES

app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/service-provider', serviceRoutes);
app.use('/', viewRoutes);


const port = 3000

app.get("/signup-service", (req,res)=>{
  res.render("signup-service")
})

app.get("/startup", (req,res)=>{
 
  res.render("startup")
})

app.get("/search",async  (req,res)=>{
  const {searchkey , filter} = req.query;
  console.log("came")
  let providers
  if (filter){
    console.log("came again")
    providers  = await ServiceProvider.find({expertise:`${filter}`})
    console.log(providers)
  }
  if (searchkey){
    console.log("came to die")
    providers = await ServiceProvider.find({username:new RegExp(`^${searchkey}`,"i")})
    
    console.log(providers)
  }
  res.render("search",{providers})


})

app.get("/booking", (req,res)=>{
  res.render("booking")
})

app.get("/customer_schedule", (req,res)=>{
  res.render("customer_schedule")
})


// testing
app.post("/createProvider", async (req,res)=>{
  const {s_id , c_id} = req.body
  const newBooking = await Booking.create({c_id , s_id})  
})


app.get("/signup-customer", (req,res)=>{
  res.render("signup-customer")
})

app.get("/login-customer",(req,res) => res.render("login-customer"))
app.get("/login-service",(req,res) => res.render("login-service"))
app.get('/', (req, res) => {res.render('home')});


app.get("/rc", (req,res) => {
  res.render("rc")
})



// connect database
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

