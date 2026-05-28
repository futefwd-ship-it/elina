import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
dotenv.config();
connectDB();

const app=express();

app.use(express.json());
app.use(cors());

import authRoutes from './routes/authRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

import ProjectDetails from './models/ProjectDetails.js';


app.get("/",(req,res)=>{
    res.send("API IS RUNNING........")
})

app.use("/api/gallery",galleryRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/floors",ProjectDetails);

const PORT=process.env.PORT || 5002;
app.listen(PORT,()=>{
    console.log(`Server running PORT : ${PORT}`);
})