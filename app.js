
const express = require("express")
const customerRoutes = require('./routes/CustomerRoute');
const connectDB = require('./database/connect');
require('dotenv').config();

const app = express()


app.use(express.static('./public'));
app.use(express.json());

// ROUTES

app.use('/api/v1/customer', customerRoutes);



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

