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

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
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