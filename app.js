

import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import mainRouter from './routes/indexRouting.js';
import bodyParser from 'body-parser';

// import {User} from './User.modal.js'
dotenv.config();
const app = express();

// const uploadRoute = require("./controllers/routeUpload.js");  
const port=process.env.PORT||3000

const corsOptions = {
  origin: "*", 
  optionsSuccessStatus: 200,
  credentials: true,
  
};
app.use(cors(corsOptions));


app.use(bodyParser.json());
// app.use("/api/users",uploadRoute);

app.use("/", mainRouter)




const dbUri =process.env.DB_URL;
console.log(dbUri)
mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
     
    });
  })
  .catch((error) => {
    console.log(error);
  });
 