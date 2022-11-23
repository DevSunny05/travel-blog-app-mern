import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routing/user-routes";
import postRouter from "./routing/post-routes";

const app=express();
dotenv.config();


// middleware
app.use(express.json());
app.use('/user',userRouter);
app.use('/posts',postRouter);

// connection
mongoose.connect(`mongodb+srv://sarang:${process.env.MONGODB_PASSWORD}@cluster0.omp6ybv.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>app.listen(5000,()=>console.log("listening to localhost 5000")))
.catch((err)=>console.log(err))





// npm run dev