const express = require("express")
const customerRoutes = require('./routes/CustomerRoute');
const serviceRoutes = require('./routes/ServiceRoute');
const viewRoutes = require('./routes/views') 
const adminRoute = require("./routes/Adminroute")

const connectDB = require('./database/connect');

const cookieParser = require("cookie-parser");
const middleware = require("./middleware/middleware")
const Booking = require("./models/booking")

require('dotenv').config();

const app = express()


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

app.set('view engine', 'ejs');

// ROUTES
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/service-provider', serviceRoutes);
app.use('/', viewRoutes);
app.use('/api/v1/admin', adminRoute)


const port = 3000

// Defaultly reject unexcepted appoinments
setInterval(defaultRejectAppoinment = async () => {

  const pendingDates = await Booking.find({status:"Pending"}).select("date")
  data = [...pendingDates]

  for (let i = 0; i < data.length; i++) {
    const todayDate = new Date();
    const appoinmentDate = data[i].date
    appoinmentDate.setDate(appoinmentDate.getDate() + 1)

    if (appoinmentDate < todayDate){
      var dataID = data[i]._id
      var changed = "Rejected";
      const defaultRejectAppoinment = await Booking.findByIdAndUpdate(dataID,{status:changed},{runValidators:true})
    }
  }
}, 10000);

// Defaultly reject not completed appoinments
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