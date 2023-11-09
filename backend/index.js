import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { Books } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import 'dotenv/config'
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
// const URI = "mongodb+srv://rahulkmr5041:ocfOMKDbflsBd5Au@cluster0.bo1rssc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected");
}).catch((err) => console.log(err));
app.get('/', (req, res) => {
    return res.status(234).send('hello world');
})
app.use('/books',booksRoute)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});



// o5rV3muR0QkcKwWs