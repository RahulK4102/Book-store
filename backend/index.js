import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { Books } from "./models/bookModel.js";
import 'dotenv/config'
const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected");
}).catch((err) => console.log(err));

app.get('/', (req, res) => {
    return res.status(234).send('hello world');
})
app.post('/books',async(req,res)=>{
    try {
        if(
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear
        ){
            return res.status(400).send({message:'Send all required fields: title,author,publishYear'});
        };

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Books.insertMany(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});



// o5rV3muR0QkcKwWs