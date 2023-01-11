
const express = require("express")
const customerRoutes = require('./routes/CustomerRoute');
const serviceRoutes = require('./routes/ServiceRoute');
const viewRoutes = require('./routes/views') 
const adminRoutes = require('./routes/Adminroute')
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
app.use('/api/v1/admin', adminRoutes)


const port = 3000

// testing
app.post("/createProvider", async (req,res)=>{
  const {s_id , c_id} = req.body
  const newBooking = await Booking.create({c_id , s_id})  
})

setInterval(defaultRejectAppoinment = async () => {
  const pendingDates = await Booking.find({status:"Pending"}).select("date")
  date = [...pendingDates]
  for (let i = 0; i < date.length; i++) {
    const todayDate = new Date();
    const appoinmentDate = date[i].date
    appoinmentDate.setDate(appoinmentDate.getDate() + 1)

    if (appoinmentDate < todayDate){
      var dataID = date[i]._id
      var changed = "Rejected";
      const defaultRejectAppoinment = await Booking.findByIdAndUpdate(dataID,{status:changed},{runValidators:true})
    }
  }
}, 10000);


setInterval(defaultCompletedAppoinment = async () => {
  const ongoingDates = await Booking.find({status:"Ongoing"}).select("date")
  data = [...ongoingDates]

  for (let i = 0; i < data.length; i++) {
    const todayDate = new Date();
    const graceDate  = data[i].date
    graceDate.setDate(graceDate.getDate() + 2)
  
    if (graceDate < todayDate){
      var dataID = data[i]._id
      var changed = "Rejected";
      const defaultCompletedAppoinment = await Booking.findByIdAndUpdate(dataID,{status:changed},{runValidators:true})
    }
  }
}, 10000);

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

