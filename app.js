import express from "express"
import mongoose from "mongoose"
import user from "./routes/user"
import post from "./routes/post"
const app = express();
// require('dotenv').config();
import Dotenv from 'dotenv';
Dotenv.config(); 

// console.log(process.env.a === '1')

// async : await가 사용될거라는걸 미리 알려줌
// await : promise가 완료되길 기다림

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

// const connectDB = async () => {
//   await mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Successfully connected to mongodb'))
//     .catch(e => console.error(e));
// }
// connectDB();

console.log('11111')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', user);
app.use('/post', post);

app.listen(3000, () => console.log("Listening on port 3000..."));

console.log('22222')