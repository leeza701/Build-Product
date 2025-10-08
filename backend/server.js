import express from 'express';
import dotenv from 'dotenv';
import path from 'path';// for deployment
import connectDB from './config/db.js';
import productRoutes from "./routes/product.js"
import cors from "cors";
// const mongoose = require("mongoose"); // if using CommonJS

dotenv.config();
const app=express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
const port=process.env.PORT;

const _dirname=path.resolve(); // for deployment

app.use(express.json()); //middleware 

app.use("/api/products",productRoutes)
console.log(process.env.MONGO_URI)

if(process.env.Node_ENV==="production"){
  app.use(express.static(path.join(_dirname,"/frontend/product/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","product","dist","index.html"))
  })
}
app.listen(port,()=>{
    connectDB(); 
    console.log(`server is running on ${port}`);
})