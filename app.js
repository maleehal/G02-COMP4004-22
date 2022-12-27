
const express = require("express")
const customerRoutes = require('./routes/CustomerRoute');
const serviceRoutes = require('./routes/ServiceRoute');
const connectDB = require('./database/connect');
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

