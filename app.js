require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose= require("mongoose")

const usersRoutes = require("./src/routes/users.route");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();


app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/health",(req,res) =>{
    res.status(200).json("Server hs running")
});

app.use("/api/v1/users", usersRoutes);

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
     .then(()=>{
      app.listen(PORT, () =>{
        console.log("server is running")
      });
    })

.catch((err)=>{
  console.log("MongoDB connection error:" , err.message);
  
});


