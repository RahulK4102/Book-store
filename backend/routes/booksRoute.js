import express from "express";
import { Books } from "../models/bookModel.js";

const router = express.Router();


router.post('/',async(req,res)=>{
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
router.get('/',async (req,res) => {
    try {
        const books = await Books.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
    }
})
router.get('/:id',async (req,res) => {
    try {
        const {id} = req.params;
        const books = await Books.findById(id);
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
    }
})

router.put('/:id',async (req,res) => {
    try {
        if (
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear
        ) {
            res.send("Please provide all information");
        }
        const {id} = req.params;
        const result = await Books.findByIdAndUpdate(id, req.body)
        if(!result){
            res.send("error updating");
        }
        res.send("updated book successfully");
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Books.findByIdAndDelete(id, req.body);
        if(!result){
            res.send("error deleting book");
        }
        res.send("deleted book successfully");
    } catch (error) {
        console.log(error)
        res.send("error in the code")
    }
})

export default router;