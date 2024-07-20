import express from "express";
import {createServer} from "node:http";
import {Server} from "Socket.io";
import mongoose from "mongoose";
import cors from "cors";
import  {connectToSocket}  from "./controllers/socketManager.js";
import userRoutes from "./routes/usersroutes.js"


const app=express();
const server=createServer(app);
const io=connectToSocket(server);

app.set("port",(process.env.PORT||8080))
app.use(cors());
app.use(express.json({lmit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",userRoutes);

const start=async()=>{
    const connectionDb=await mongoose.connect("mongodb+srv://kise110604:Sarath7893@cluster0.zcmtcwy.mongodb.net/");
    console.log(`database connnected:${connectionDb.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("Server started");
    });
};




start();